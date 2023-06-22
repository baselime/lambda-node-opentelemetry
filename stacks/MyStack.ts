import { StackContext, Api } from "sst/constructs";
import { Architecture, Code, LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { RemovalPolicy } from "aws-cdk-lib";
export function LAYER({ stack }: StackContext) {

  const layer = new LayerVersion(stack, "layer", {
    layerVersionName: "baselime-node",
    description: "Use Baselimes enhanced OpenTelemetry Distro to trace your AWS Lambda functions",
    code: Code.fromAsset("./layer-dir"),
    compatibleArchitectures: [Architecture.ARM_64, Architecture.X86_64],
    compatibleRuntimes: [Runtime.NODEJS_14_X, Runtime.NODEJS_16_X, Runtime.NODEJS_18_X],
    removalPolicy: RemovalPolicy.RETAIN,
  });

  
  layer.addPermission("layerPermission", {
    accountId: "*",
  });
  stack.addOutputs({
    layerArn: layer.layerVersionArn,
  });
}
