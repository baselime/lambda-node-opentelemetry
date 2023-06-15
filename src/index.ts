import api, { trace, context, propagation, Context as OtelContext, ROOT_CONTEXT } from "@opentelemetry/api";
import { Handler } from "aws-lambda";
import { flattenObject } from './utils';
import { Context } from 'aws-lambda';

export function wrap(handler: Handler) {

  return async (event: any, lambda_context: Context) => {
    const tracer = trace.getTracer('@baselime/baselime-lambda-wrapper', '1');

    const parent = determinParent(event);
    console.log(parent);
    const span = tracer.startSpan(lambda_context.functionName, {
      attributes: flattenObject({
        event,
        context: lambda_context,
        faas: {
          execution: lambda_context.awsRequestId,
          name: lambda_context.functionName,
          runtime: 'nodejs',
          id: lambda_context.invokedFunctionArn,
          
        },
        cloud: {
          account: {
            id: lambda_context.invokedFunctionArn.split(":")[4],
          }
        }
      }),
    }, parent);
    const ctx = trace.setSpan(context.active(), span);
    
    try {
      const result = await context.with(ctx, handler as (args: any[]) => any, null, event, lambda_context);
      span.setAttributes(flattenObject(result, 'result'));
      span.end();
      return result;
    } catch (e) {
      const err = e as Error;
      span.recordException(err);
      span.setAttributes(flattenObject({ name: err.name, message: err.message, stack: err.stack }, 'error'));
      span.end();
      throw e
    } finally {
      // ts-ignore
      if (baselimeLambdaFlush) {
        console.log('flushing');
        baselimeLambdaFlush();
      }

    }
  }
}


function detectService(event: any) {
	if (event.requestContext?.apiId) {
		return "api";
	}

	if (event.Records && event.Records[0]?.EventSource === "aws:sns") {
		return "sns";
	}

	return 'unknown'
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
	keys(carrier:Object): string[] {
		return Object.keys(carrier);
	},
	get(carrier: Record<string, { Value: string }>, key: string): string | undefined {
		return carrier[key]?.Value;
	},
};

function determinParent(event: any): OtelContext {
  let parent: OtelContext | undefined = undefined;

  const extractedContext = extractContext(event);

  if (trace.getSpan(extractedContext)?.spanContext()) {
    return extractedContext;
  }

  if(!parent) {
    return ROOT_CONTEXT
  }
  return parent;
}

function extractContext(event: any) {
  switch (detectService(event)) {
    case "api":
      const httpHeaders = event.headers || {};
      return propagation.extract(
        api.context.active(),
        httpHeaders,
        headerGetter,
      );
    case "sns":
      console.log(event.Records[0].Sns.MessageAttributes);
      return propagation.extract(
        api.context.active(),
        event.Records[0].Sns.MessageAttributes,
        snsGetter,
      );
  }
  return propagation.extract(api.context.active(), {}, headerGetter);
}