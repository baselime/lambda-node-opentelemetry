import api, { Attributes, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
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
import { existsSync } from "node:fs";
import { arch } from "node:os"
if (process.env.OTEL_LOG_LEVEL === "debug") {
	api.diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);
}

const provider = new NodeTracerProvider({
	resource: new Resource({
		"service.name": process.env.BASELIME_SERVICE,
		"faas.name": process.env.AWS_LAMBDA_FUNCTION_NAME,
		"faas.max_memory": process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
		"faas.architecture": arch(),
		"faas.version": process.env.AWS_LAMBDA_FUNCTION_VERSION,
		'cloud.region': process.env.AWS_REGION || 'unknown',
		"cloud.provider": "aws",
	}),
});

let collectorURL: string = process.env.COLLECTOR_URL || "https://otel.baselime.io/v1"

if (existsSync('/opt/extensions/baselime')) {
	collectorURL = 'http://sandbox:4323';
}

enum CompressionAlgorithm {
	GZIP = "gzip",
}
const spanProcessor = new BatchSpanProcessor(
	new OTLPTraceExporter({
		url: `${collectorURL}/${process.env.AWS_LAMBDA_FUNCTION_NAME}`,
		compression: CompressionAlgorithm.GZIP,
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
			if (response) {
				const awsApiReqData = {
					request: response.request,
					response: response.data,
				};
			span.setAttributes(flattenObject(awsApiReqData) as Attributes);
			}
		},
	}),
	new HttpInstrumentation({}),
]

registerInstrumentations({
	instrumentations
});

declare const global : {
	baselimeLambdaFlush: () => void;
}


global['baselimeLambdaFlush'] = async () => {
	try {

		// TODO figure out why this is 20ms on cold start vs 3 ms on regular invocation
		await provider.forceFlush();
	} catch(e) {
		console.log(e)
	}
};