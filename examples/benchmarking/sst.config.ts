import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "benchmarking",
      region: "eu-west-2",
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      architecture: "arm_64",
    })
    app.stack(API);
  }
} satisfies SSTConfig;
