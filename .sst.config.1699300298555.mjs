import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// stacks/Layer.ts
import { Architecture, Code, LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { RemovalPolicy } from "aws-cdk-lib";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
function LAYER({ stack }) {
  const layer = new LayerVersion(stack, "layer", {
    layerVersionName: "baselime-node",
    description: "Use Baselimes enhanced OpenTelemetry Distro to trace your AWS Lambda functions",
    code: Code.fromAsset("./layer-dir"),
    compatibleArchitectures: [Architecture.ARM_64, Architecture.X86_64],
    compatibleRuntimes: [Runtime.NODEJS_14_X, Runtime.NODEJS_16_X, Runtime.NODEJS_18_X],
    removalPolicy: RemovalPolicy.RETAIN
  });
  const parameter = new StringParameter(stack, `/${stack.stage}/baselime/otel/tracer/node`, {
    parameterName: `/${stack.stage}/baselime/otel/tracer/node`,
    stringValue: layer.layerVersionArn
  });
  layer.addPermission("layerPermission", {
    accountId: "*"
  });
  layer.applyRemovalPolicy(RemovalPolicy.RETAIN);
  stack.addOutputs({
    layerArn: layer.layerVersionArn,
    parameterName: parameter.parameterName
  });
}
__name(LAYER, "LAYER");

// sst.config.ts
var sst_config_default = {
  config(_input) {
    return {
      name: "lambda-node-opentelemetry",
      region: "eu-west-2"
    };
  },
  stacks(app) {
    app.stack(LAYER);
  }
};
export {
  sst_config_default as default
};
