import { MiddlewareObj } from "@middy/core";

export const loggerMiddleware = (): MiddlewareObj => {
  return {
    before: async (request) => {
      console.log("Incoming event:", JSON.stringify(request.event));
    },
    after: async (request) => {
      console.log("Result:", request.response);
    },
    onError: async (request) => {
      console.error("Error:", request.error);
      // Dejar que Middy continúe manejando el error
    }
  };
};
