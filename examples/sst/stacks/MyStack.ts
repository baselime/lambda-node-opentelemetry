import { StackContext, Api, EventBus, App } from "sst/constructs";
import { LayerVersion } from "aws-cdk-lib/aws-lambda";


function magicShit(api) {
  console.log(api)
}
export function API({ stack }: StackContext) {

  const baselime = LayerVersion.fromLayerVersionArn(
    stack,
    "BaselimeLayer",
    `arn:aws:lambda:eu-west-2:374211872663:layer:baselime-node:7`
  );
  
  if (!(stack.node.scope as App)?.local) {
    stack.addDefaultFunctionLayers([baselime]);
    stack.addDefaultFunctionEnv({
      AWS_LAMBDA_EXEC_WRAPPER: '/opt/baselime',
      BASELIME_KEY: process.env.BASELIME_KEY as string,
      COLLECTOR_URL: 'https://otel.baselime.cc/v1',
      OTEL_LOG_LEVEL: 'debug',
      BASELIME_ORIGINAL_HANDLER: 'packages/functions/src/todo.handler',
    });
    
  }

  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        
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

  magicShit(api);

  bus.subscribe("todo.created", {
    handler: "packages/functions/src/events/todo-created.handler",
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
