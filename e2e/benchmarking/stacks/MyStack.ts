import { StackContext, Api, EventBus } from "sst/constructs";

const environment = (handler: string) => ({
  "AWS_LAMBDA_EXEC_WRAPPER": "/opt/baselime",
  "BASELIME_ACTUAL_HANDLER": handler,
  "BASELIME_KEY": "gB8vt7EOWH25VzkHtwJRe9hzZIOE70ZaSueQJwH2",
  "BASELIME_SURPRESS_EXTENSION_LOGS": "true",
  "COLLECTOR_URL": "https://otel.baselime.cc"
})

const handler = "/opt/nodejs/node_modules/@baselime/lambda-node-opentelemetry/handler.handler";


export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /no-tracing": { function: { handler: "packages/functions/src/lambda.handler" } },
      "GET /both": { function: { handler: "packages/functions/src/lambda.handler", layers: ["arn:aws:lambda:eu-west-2:374211872663:layer:baselime-extension-arm64:11", "arn:aws:lambda:eu-west-2:374211872663:layer:baselime-node:56"] } },
      "GET /tracing": { function: { handler: "packages/functions/src/lambda.handler", layers: ["arn:aws:lambda:eu-west-2:374211872663:layer:baselime-node:56"] } },
      "GET /extension": { function: { handler: "packages/functions/src/lambda.handler", layers: ["arn:aws:lambda:eu-west-2:374211872663:layer:baselime-extension-arm64:11"] } },
      "GET /combined": { function: { handler: "packages/functions/src/lambda.handler", layers: ["arn:aws:lambda:eu-west-2:374211872663:layer:baselime-node-combined:7"] } },
      "GET /tracing-activated": {
        function: {
          // todo set handler to /opt/nodejs/node_modules/@baselime/lambda-node-opentelemetry/handler.handler when deployed
          handler: "packages/functions/src/lambda.handler", layers: ["arn:aws:lambda:eu-west-2:374211872663:layer:baselime-node:56"], environment: environment("packages/functions/src/lambda.handler")
        }
      },
      "GET /combined-activated": {
        function: {
          handler: "packages/functions/src/lambda.handler", layers: ["arn:aws:lambda:eu-west-2:374211872663:layer:baselime-node-combined:7"], environment: environment("packages/functions/src/lambda.handler")
        }
      },
      "GET /both-activated": {
        function: {
          handler: "packages/functions/src/lambda.handler", layers: ["arn:aws:lambda:eu-west-2:374211872663:layer:baselime-extension-arm64:11", "arn:aws:lambda:eu-west-2:374211872663:layer:baselime-node:56"], environment: environment("packages/functions/src/lambda.handler")
        }
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
