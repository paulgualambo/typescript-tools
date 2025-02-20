export const inputSchema = {
    oneOf: [
      {
        type: "object",
        properties: {
          headers: {
            type: "object",
            properties: {
              "Content-Type": { type: "string" }
            },
            required: ["Content-Type"]
          },
          body: { type: "object" }
        },
        required: ["headers", "body"]
      },
      {
        type: "object",
        properties: {
          queryStringParameters: {
            type: "object"
          },
          body: { type: "string" }
        },
        required: ["queryStringParameters", "body"]
      }
    ]
  };