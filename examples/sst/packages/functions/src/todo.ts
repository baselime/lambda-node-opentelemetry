import { APIGatewayProxyEventV2, Callback, Context } from "aws-lambda";

export const handler = (a: APIGatewayProxyEventV2, b: Context, c: Callback) => {
  console.log("TODO LIST", JSON.stringify({ MESSAGE: [{ id: 1, text: "TODO 1" }] }));

  c(null, {
    statusCode: 200,
    body: JSON.stringify({ MESSAGE: [{ id: 1, text: "TODO 12" }] }),
  })
}