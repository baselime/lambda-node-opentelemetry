import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";
import { Tags } from "aws-cdk-lib/core";

export default {
  config(_input) {
    return {
      name: "sst",
      region: "eu-west-2",
    };
  },
  stacks(app) {
    app.stack(API);
    Tags.of(app).add("baselime:tracing", "true");
  }
} satisfies SSTConfig;
