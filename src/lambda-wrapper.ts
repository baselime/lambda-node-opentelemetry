
import { AwsInstrumentation } from "@opentelemetry/instrumentation-aws-sdk";
import { flatten } from "flat";

import { BaselimeSDK, BetterHttpInstrumentation } from "@baselime/node-opentelemetry";

const blockedRequestOperations = [
	{ service: 'S3', operation: 'PutObject' },
	{ service: 'Kinesis', operation: 'PutRecord' }
]

const blockedResponseOperations = [
	{ service: 'S3', operation: 'GetObject' },
]

const instrumentations = [
	new AwsInstrumentation({
		suppressInternalInstrumentation: process.env.AWS_SDK_INTERNALS === 'true' ? false : true,
		responseHook(span, { response }) {
			if (response && !blockedResponseOperations.some(({ service, operation }) => response.request.serviceName === service && response.request.commandName === operation)) {
				span.setAttributes(flatten({
					response: response.data,
				}))
			}
		},
		preRequestHook(span, request) {
			if (!blockedRequestOperations.some(({ service, operation }) => request.request.serviceName === service && request.request.commandName === operation)) {
				span.setAttributes(flatten({
					request: request.request,
				}))
			}
		}
	}),
	new BetterHttpInstrumentation({
		captureBody: process.env.BASELIME_REQUEST_CAPTURE === 'true' ? true : false,
		captureHeaders: true,
	})
]

new BaselimeSDK({ instrumentations, service: process.env.AWS_LAMBDA_FUNCTION_NAME }).start();