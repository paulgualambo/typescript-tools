import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { initContainer } from "../../common/container";
import { BaseHandler } from "./myHandler";
import { TYPES } from "../../common/types";
import middy, { MiddlewareObj } from "@middy/core";
import validator from "@middy/validator";
import { inputSchema } from "./schemas";
import { transpileSchema } from '@middy/validator/transpile'
// import { customErrorHandler } from "../../common/custom-error-handler";

export const lambdaExecute = (
    event: APIGatewayProxyEvent,
): APIGatewayProxyResult => {
    const container = initContainer();
    const saveHandler = container.get<BaseHandler>(TYPES.BaseHandler);
    return saveHandler.handle(event);
};

const customErrorHandler = (): MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
    return {
      onError: async (request: any) => {
        //console.error("Error capturado:", request.error)
  
        // Definimos la respuesta personalizada
        request.response = {
          statusCode: 400,
          body: JSON.stringify({
            error: "ValidationError",
            message: request.error?.message,
            details: request.error?.details || null
          })
        }
        // Al asignar request.response, Middy devolverá esta respuesta
        // y termina la cadena de middlewares.
      }
    }
  }

/**
 * Handler principal que aplica los middlewares (ejemplo: loggerMiddleware).
 */
export const main = middy((event: any): APIGatewayProxyResult => {
    return lambdaExecute(event);
}
)
.use(validator({ 
    eventSchema: transpileSchema(inputSchema)
}))
.use(customErrorHandler());