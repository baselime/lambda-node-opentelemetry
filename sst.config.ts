import { SSTConfig } from "sst";
import { LAYER } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "lambda-node-opentelemetry",
      region: "eu-west-2",
    };
  },
  stacks(app) {
    app.stack(LAYER);
  }
} satisfies SSTConfig;
