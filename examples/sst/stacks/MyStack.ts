import { StackContext, Api } from "@serverless-stack/resources";

export function MyStack({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "functions/lambda.handler",
    },
    defaults: {
      function: {
        environment: {
          NODE_OPTIONS: '--require lambda-wrapper.js',
          BASELIME_NAMESPACE: stack.stackName,
          BASELIME_OTEL_KEY: process.env.BASELIME_OTEL_KEY
        },
        bundle: {
          copyFiles: [{ from: "./lambda-wrapper.js", to: "./lambda-wrapper.js" }]
        }
      }
    }
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
