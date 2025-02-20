import { IProceso } from "./i-proceso";
import { Result, STATUS } from "../common/result";
import { Buffer } from 'buffer';
import { People } from "./models/people";

export class Proceso implements IProceso {

    execute(data: People): Result<ResultProceso> {

        const result: ResultProceso = {
            idUser: Buffer.from(data.email).toString('base64'),
            fullname: data.name,
            email: data.email
        }
        return new Result<ResultProceso>(result, STATUS.SUCCESS);
    }

}

export interface ResultProceso {
    idUser: string
    fullname: string
    email: string
}