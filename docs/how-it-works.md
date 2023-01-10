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
| AwsLambdaInstrumentation | https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/plugins/node/opentelemetry-instrumentation-aws-lambda/src/instrumentation.ts | Adds support for aws lambda, adds a span for the function invocation, makes sure spans are flushed before the lambda kills itself |
| AwsInstrumentation | https://github.com/open-telemetry/opentelemetry-js-contrib/blob/main/plugins/node/opentelemetry-instrumentation-aws-sdk/src/aws-sdk.ts | |
| HttpInstrumentation | https://github.com/open-telemetry/opentelemetry-js/blob/2dcc898514a60e5b9ac7ddea9b6f1e6c219097af/experimental/packages/opentelemetry-instrumentation-http/src/http.ts | |

# Instrumenting Libraries

# Propagation

# Interactions With AWS Lambda

# W