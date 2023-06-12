import { StackContext, Api } from "sst/constructs";
import { Code, LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
export function LAYER({ stack }: StackContext) {

  const layer = new LayerVersion(stack, "layer", {
    layerVersionName: "BASElIME-node",
    code: Code.fromAsset("./layer-dir"),
    compatibleRuntimes: [Runtime.NODEJS_14_X, Runtime.NODEJS_16_X, Runtime.NODEJS_18_X],
  });
  layer.addPermission("layerPermission", {
    accountId: "*",
  });
  stack.addOutputs({
    layerArn: layer.layerVersionArn,
  });
}
