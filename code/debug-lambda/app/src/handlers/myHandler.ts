import middy from "@middy/core";
import { initContainer } from "../common/container";
import { TYPES, MyEvent } from "../common/types";
import { DomainService } from "../services/domain.service";
import { loggerMiddleware } from "../common/logger.middleware";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { inject } from "inversify";

/**
 * Lógica principal sin Middy: Obtiene el servicio de dominio desde el contenedor e invoca el proceso.
 */
export class BaseHandler {

  constructor(
    @inject(TYPES.DomainService)
    private readonly domainService: DomainService,    
  ){

  }

  handle(event: APIGatewayProxyEvent): APIGatewayProxyResult {
    // Se asume que el body viene en JSON con la forma { myArray: string[], userId: string }
    let parsedBody: MyEvent = { myArray: [], userId: "" };

    if (event.body) {
      parsedBody = JSON.parse(event.body);
    }

    const result = this.domainService.processArray(parsedBody.myArray);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Lambda executed successfully",
        result,
        userId: parsedBody.userId || "No userId provided"
      })
    };
  }
}

export const handleRequest = (
  event: APIGatewayProxyEvent,
): APIGatewayProxyResult => {
  const container = initContainer();
  const saveHandler = container.get<BaseHandler>(TYPES.BaseHandler);
  return saveHandler.handle(event);
};

/**
 * Handler principal que aplica los middlewares (ejemplo: loggerMiddleware).
 */
export const main = middy((event: any): APIGatewayProxyResult => {
  return handleRequest(event);
}
).use(loggerMiddleware())
