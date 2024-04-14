import { StackContext, Table, Api } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {
  // Create the table
  const table = new Table(stack, "Counter", {
    fields: {
      counter: "string",
      tally: "string",
    },
    primaryIndex: { partitionKey: "counter" },
  });

  // Create the HTTP API
const api = new Api(stack, "Api", {
  defaults: {
    function: {
      // Bind the table name to our API
      bind: [table],
    },
  },
  routes: {
    "POST /": "packages/functions/src/lambda.main",
  },
});

// Show the URLs in the output
stack.addOutputs({
  ApiEndpoint: api.url,
});
}