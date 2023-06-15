
export const handler = lambdaInstrumentation(async () => {
  console.log("TODO LIST", JSON.stringify({ MESSAGE:[{ id: 1, text: "TODO 1" }]}));
  
  return {
    statusCode: 200,
    body: JSON.stringify({ MESSAGE:[{ id: 1, text: "TODO 1" }]}),
  }
})