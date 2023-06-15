import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "sst",
      region: "eu-west-2",
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      timeout: 20,
      memorySize: 512,
      tracing: 'pass_through',
      nodejs: {
        format: "cjs"
      }
    });
    app.stack(API);
  }
} satisfies SSTConfig;
