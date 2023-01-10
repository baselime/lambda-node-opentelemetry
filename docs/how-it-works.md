# How it works

OTEL is really complicated

# Overview

Components
| Module | URL | Purpose |
| --- | --- | --- |
| NodeTracerProvider | https://github.com/open-telemetry/opentelemetry-js/blob/main/packages/opentelemetry-sdk-trace-node/src/NodeTracerProvider.ts | Configures [BasicTracerProvider](https://github.com/open-telemetry/opentelemetry-js/blob/main/packages/opentelemetry-sdk-trace-base/src/BasicTracerProvider.ts) |
| BasicTracerProvider | https://github.com/open-telemetry/opentelemetry-js/blob/main/packages/opentelemetry-sdk-trace-base/src/BasicTracerProvider.ts | Provides the tracer and links it to the span processor |
| BatchSpanProcessor | https://github.com/open-telemetry/opentelemetry-js/blob/main/packages/opentelemetry-sdk-trace-base/src/platform/node/export/BatchSpanProcessor.ts | Extends BatchSpanProcessorBase ads no-op on shutdown method |
| BatchSpanProcessorBase | https://github.com/open-telemetry/opentelemetry-js/blob/main/packages/opentelemetry-sdk-trace-base/src/export/BatchSpanProcessorBase.ts | Pushes 512 spans to the Exporter every 5 seconds, Max spans stored is 2048. These values can be configured. | 
| OLTPTraceExporter | https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/exporter-trace-otlp-http | Converts spans to a json based format (reducing payload size as well by removing duplication) and extends OLTPTraceExporterNodeBase |
| OTLPExporterNodeBase | https://github.com/open-telemetry/opentelemetry-js/blob/main/experimental/packages/otlp-exporter-base/src/platform/node/OTLPExporterNodeBase.ts | Abstract class that  implements send method to send items via HTTP as json |
| registerInstrumentations | https://github.com/open-telemetry/opentelemetry-js/blob/main/experimental/packages/opentelemetry-instrumentation/src/autoLoader.ts | Adds the tracer to all the instrumentation plugins |
| AwsLambdaInstrumentation | https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/plugins/node/opentelemetry-instrumentation-aws-lambda/src/instrumentation.ts | Adds support for aws lambda, adds a span for the function invocation, makes sure spans are flushed before the lambda shuts down, exposes some functions to customise the span with the event and returned data. Extends InstrumentationBase |
| AwsInstrumentation | https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/plugins/node/opentelemetry-instrumentation-aws-sdk/src/aws-sdk.ts | Adds spans for AWS SDK calls, sets traceparent field for SNS and SQS, adds some special gubbins for dynamodb queries, Extends InstrumentationBase |
| HttpInstrumentation | https://github.com/open-telemetry/opentelemetry-js/blob/main/experimental/packages/opentelemetry-instrumentation-http/src/http.ts | Adds spans for HTTP Requests, makes it really difficult to add body and response data to the span... seriously why is this so hard wtf. Extends InstrumentationBase |
| InstrumentationBase | https://github.com/open-telemetry/opentelemetry-js/blob/main/experimental/packages/opentelemetry-instrumentation/src/platform/node/instrumentation.ts | Extends InstrumentationAbstract and makes it possible to autoinstrument node libraries using the [require-in-the-middle](https://www.npmjs.com/package/require-in-the-middle) allowing you to modify node modules on the fly as they are being required |


# Instrumenting Libraries

# Propagation

# Interactions With AWS Lambda

# W