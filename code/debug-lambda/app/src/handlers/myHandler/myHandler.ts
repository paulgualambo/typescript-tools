import { TYPES, MyEvent } from "../../common/types";
import { DomainService } from "../../services/domain.service";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { inject } from "inversify";

/**
 * Lógica principal sin Middy: Obtiene el servicio de dominio desde el contenedor e invoca el proceso.
 */
export class BaseHandler {

  constructor(
    @inject(TYPES.DomainService)
    private readonly domainService: DomainService,
  ) {

  }

  handle(event: APIGatewayProxyEvent): APIGatewayProxyResult {
       
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


