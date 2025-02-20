import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { initContainer } from "../../common/container";
import { BaseHandler } from "./myHandler";
import { TYPES } from "../../common/types";
import middy from "@middy/core";
import { loggerMiddleware } from "../../common/logger.middleware";
import httpJsonBodyParser from "@middy/http-json-body-parser";

export const executeLambda = (
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
    return executeLambda(event);
}
)
.use(loggerMiddleware())