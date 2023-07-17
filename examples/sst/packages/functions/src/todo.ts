import { LambdaClient, ListFunctionsCommand } from "@aws-sdk/client-lambda";

export const handler = async () => {
  console.log("TODO LIST", JSON.stringify({ MESSAGE: [{ id: 1, text: "TODO 1" }] }));
  const client = new LambdaClient({});
  const command = new ListFunctionsCommand({});
  const response = await client.send(command);
  console.log("response", response)
  return {
    statusCode: 200,
    body: JSON.stringify({ MESSAGE: [{ id: 1, text: "TODO 1" }] }),
  }
}