
import { AwsInstrumentation } from "@opentelemetry/instrumentation-aws-sdk";
import { flatten } from "flat";

import { BaselimeSDK, BetterHttpInstrumentation } from "@baselime/node-opentelemetry";

const instrumentations = [
	new AwsInstrumentation({
		suppressInternalInstrumentation: process.env.AWS_SDK_INTERNALS === 'true' ? false : true,
		responseHook: (span, { response }) => {
			if (response) {
				const awsApiReqData = {
					request: response.request,
					response: response.data,
				};
				span.setAttributes(flatten(awsApiReqData));
			}
		}
	}),
	new BetterHttpInstrumentation({
		captureBody: process.env.BASELIME_REQUEST_CAPTURE === 'true' ? true : false,
		captureHeaders: true,
	})
]

new BaselimeSDK({ instrumentations }).start();