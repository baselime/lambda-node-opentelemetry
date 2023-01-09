const api = require("@opentelemetry/api");
const { BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const {
  AwsLambdaInstrumentation,
} = require("@opentelemetry/instrumentation-aws-lambda");
const {
  AwsInstrumentation,
} = require("@opentelemetry/instrumentation-aws-sdk");
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { Resource } from "@opentelemetry/resources";
import { flattenObject } from "./utils";

const provider = new NodeTracerProvider({
  resource: new Resource({
    "service.name": process.env.BASELIME_SERVICE_NAME,
  }),
});

const spanProcessor = new BatchSpanProcessor(
  new OTLPTraceExporter({
    url: "https://otel.baselime.cc/v1",
    headers: {
      "x-api-key": process.env.BASELIME_OTEL_KEY,
    },
  })
);

provider.addSpanProcessor(spanProcessor);
provider.register();

function detectService(event) {
  if(event.requestContext?.apiId) {
    return 'api'
  }

  if(event.Records && event.Records[0]?.EventSource === 'aws:sns') {
    return 'sns'
  }
};

const headerGetter = {
  keys(carrier): string[] {
    return Object.keys(carrier);
  },
  get(carrier, key: string) {
    return carrier[key];
  },
};

const snsGetter = {
  keys(carrier): string[] {
    return Object.keys(carrier);
  },
  get(carrier, key: string) {
    console.log(carrier, key)
    return carrier[key]?.Value;
  },
}
registerInstrumentations({
  instrumentations: [
    new AwsInstrumentation({ suppressInternalInstrumentation: true }),
    new HttpInstrumentation({}),
    new AwsLambdaInstrumentation({
      disableAwsContextPropagation: true,
      requestHook: (span, { event, context }) => {
        span.setAttribute("faas.name", context.functionName);
        span.setAttributes(flattenObject(event, "faas.event"));
      },
      responseHook: (span, { err, res }) => {
        if (err instanceof Error) span.setAttribute("faas.error", err.message);
        if (res) span.setAttributes(flattenObject(res, "faas.res"));
      },
      eventContextExtractor: (event) => {
        switch(detectService(event)) {
          case 'api':
            const httpHeaders = event.headers || {};  
            return api.propagation.extract(api.context.active(), httpHeaders, headerGetter);
          case 'sns':
            return api.propagation.extract(api.context.active(), event.Records[0].Sns.MessageAttributes, snsGetter);
        }
        return api.propagation.extract(api.context.active(), {}, headerGetter);
      }
    }),
  ],
});
