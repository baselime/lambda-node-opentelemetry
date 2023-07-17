import { StackContext, Api, EventBus, App } from "sst/constructs";
import { LayerVersion } from "aws-cdk-lib/aws-lambda";
import { Tags } from "aws-cdk-lib";


export function API({ stack }: StackContext) {

  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        permissions: ["lambda:ListFunctions"],
        environment: {
          BEEP: "YARP"
        },
        bind: [bus],
        nodejs: {
          esbuild: {
            external: ["@baselime/lambda-node-opentelemetry"]
          }
        }
      },
    },
    routes: {
      "GET /": "packages/functions/src/todo.handler",
    },
  });
  api.attachPermissions(["lambda:ListFunctions"]);
  Tags.of(api).add("baselime:tracing", "true");

  bus.subscribe("todo.created", {
    handler: "packages/functions/src/events/todo-created.handler",
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
