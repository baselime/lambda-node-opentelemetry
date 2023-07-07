import api, { trace, context, propagation, Context as OtelContext, ROOT_CONTEXT, Attributes } from "@opentelemetry/api";
import { Handler, DynamoDBStreamEvent, S3Event } from "aws-lambda";
import { flatten } from "flat"
import { Context } from 'aws-lambda';
export * as logger from './logger';

declare const global: {
  baselimeLambdaFlush: () => Promise<void>;
}

type FaasDocument = {
  collection: string
  operation: string
  time: string
  name: string
}
let coldstart = true;

export function wrap(handler: Handler) {
  return async (event: any, lambda_context: Context) => {
    const tracer = trace.getTracer('@baselime/baselime-lambda-wrapper', '1');
    const service = detectService(event);
    const trigger = triggerToServiceType(service);
    const parent = determinParent(event, service);
    let document: FaasDocument | null = null;
    if (trigger === 'datasource') {
      if (service === 'dynamodb') {
        document = getDynamodbStreamDocumentAttributes(event);
      }

      if (service === 's3') {
        document = getS3DocumentAttributes(event);
      }
    }
    const span = tracer.startSpan(lambda_context.functionName, {
      attributes: flatten({
        event,
        context: lambda_context,
        faas: {
          execution: lambda_context.awsRequestId,
          runtime: 'nodejs',
          trigger,
          document,
          invoked_by: service,
          id: lambda_context.invokedFunctionArn,
          coldstart,
        },
        cloud: {
          resource_id: lambda_context.invokedFunctionArn,
          account_id: lambda_context.invokedFunctionArn.split(":")[4],
        }
      }) as Attributes,
    }, parent);
    coldstart = false;
    const ctx = trace.setSpan(context.active(), span);

    try {
      const result = await context.with(ctx, handler as (args: any[]) => any, null, event, lambda_context);
      span.setAttributes(flatten({ result }) as Attributes);
      span.end();
      return result;
    } catch (e) {
      const err = e as Error;
      span.recordException(err);
      span.setAttributes(flatten({ error: { name: err.name, message: err.message, stack: err.stack } }) as Attributes);
      span.end();
      throw e
    } finally {
      if (global.baselimeLambdaFlush) {
        await global.baselimeLambdaFlush();
      }
    }
  }
}


function detectService(event: any) {
  if (event.requestContext?.apiId) {
    return "api-gateway";
  }

  if (event.requestContext?.apiId && event.version === "2.0") {
    return "api-gateway-v2";
  }

  if (event.Records && event.Records[0]?.EventSource === "aws:sns") {
    return "sns";
  }

  if (event.Records && event.Records[0]?.eventSource === "aws:sqs") {
    return "sqs";
  }

  if (event.Records && event.Records[0]?.eventSource === "aws:kinesis") {
    return "kinesis";
  }

  if (event.Records && event.Records[0]?.eventSource === "aws:dynamodb") {
    return "dynamodb";
  }

  if (event.Records && event.Records[0]?.eventSource === "aws:s3") {
    return "s3";
  }

  return 'unknown'
}

function triggerToServiceType(service: string) {
  switch (service) {
    case "api":
    case "api-gateway":
    case "api-gateway-v2":
    case "function-url":
      return "http";
    case "sns":
    case "sqs":
    case "kinesis":
    case "eventbridge":
      return "pubsub";
    case "dynamodb":
    case "s3":
      return "datasource"
    default:
      return "other";
  }
}

const headerGetter = {
  keys(carrier: Object): string[] {
    return Object.keys(carrier);
  },
  get(carrier: Record<string, string>, key: string): string | undefined {
    return carrier[key];
  },
};

const snsGetter = {
  keys(carrier: Object): string[] {
    return Object.keys(carrier);
  },
  get(carrier: Record<string, { Value: string }>, key: string): string | undefined {
    return carrier[key]?.Value;
  },
};

function determinParent(event: any, service: string): OtelContext {
  let parent: OtelContext | undefined = undefined;

  const extractedContext = extractContext(event, service);

  if (trace.getSpan(extractedContext)?.spanContext()) {
    return extractedContext;
  }

  if (!parent) {
    return ROOT_CONTEXT
  }
  return parent;
}

function extractContext(event: any, service: string) {
  switch (service) {
    case "api":
    case "api-gateway":
    case "api-gateway-v2":
    case "function-url":
      const httpHeaders = event.headers || {};
      return propagation.extract(
        api.context.active(),
        httpHeaders,
        headerGetter,
      );
    case "sns":
      return propagation.extract(
        api.context.active(),
        event.Records[0].Sns.MessageAttributes,
        snsGetter,
      );
  }
  return propagation.extract(api.context.active(), {}, headerGetter);
}

const DynamodbEventToDocumentOperations = {
  INSERT: 'insert',
  MODIFY: 'update',
  REMOVE: 'delete',
  default: ''
};

function getDynamodbStreamDocumentAttributes(event: DynamoDBStreamEvent): FaasDocument {
  const unixTime = event?.Records[0]?.dynamodb?.ApproximateCreationDateTime || Date.now() / 1000;
  return {
    // TODO we could do better for collection (infer from single table design patterns?)
    collection: (event?.Records[0]?.eventSourceARN || '').split("/")[1],
    name: (event?.Records[0]?.eventSourceARN || '').split("/")[1],
    operation: DynamodbEventToDocumentOperations[event?.Records[0]?.eventName || "default"],
    time: new Date(unixTime).toUTCString(),
  }
}

function getS3DocumentAttributes(event: S3Event): FaasDocument {
  let operation = 'unkown';

  if (event.Records[0].eventName.startsWith('ObjectCreated')) {
    operation = 'insert';
  }

  if (event.Records[0].eventName.startsWith('ObjectRemoved')) {
    operation = 'delete';
  }
  return {
    collection: event.Records[0].s3.bucket.name,
    name: event.Records[0].s3.object.key,
    operation,
    time: event.Records[0].eventTime,
  }
}