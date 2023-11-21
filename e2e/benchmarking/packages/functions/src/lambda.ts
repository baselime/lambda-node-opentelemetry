import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async (_evt) => {
  // simulate a 100ms delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    statusCode: 200,
    body: `Hello world. The time is ${new Date().toISOString()}`,
  };
});
