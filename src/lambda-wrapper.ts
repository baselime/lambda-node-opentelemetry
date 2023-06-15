import api, { DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import {
	OTLPTraceExporter,
} from "@opentelemetry/exporter-trace-otlp-http";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { Instrumentation, registerInstrumentations } from "@opentelemetry/instrumentation";
import {
	AwsInstrumentation,
} from "@opentelemetry/instrumentation-aws-sdk";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { Resource } from "@opentelemetry/resources";
import { flattenObject } from "./utils";

if(process.env.OTEL_LOG_LEVEL === "debug") {
	console.log("debug logging enabled")
	api.diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);
}

const provider = new NodeTracerProvider({
	resource: new Resource({
		"service.name": process.env.BASELIME_SERVICE,
		"faas.name": process.env.AWS_LAMBDA_FUNCTION_NAME,
		'aws.region': process.env.AWS_REGION || 'unknown',
	}),
});

const spanProcessor = new BatchSpanProcessor(
	new OTLPTraceExporter({
		url: process.env.COLLECTOR_URL || "https://otel.baselime.io/v1",
		headers: {
			"x-api-key": process.env.BASELIME_KEY || process.env.BASELIME_OTEL_KEY,
		},
	}),
);

provider.addSpanProcessor(spanProcessor);
provider.register();

const instrumentations: Instrumentation[] = [
	new AwsInstrumentation({
		suppressInternalInstrumentation: true,
		responseHook: (span, { response }) => {
			if (response)
				span.setAttributes(
					flattenObject({
						request: response.request,
						response: response.data,
					}),
				);
		},
	}),
	new HttpInstrumentation({}),
]

registerInstrumentations({
	instrumentations
});

global['baselimeLambdaFlush'] = () => {
	provider.forceFlush();
};