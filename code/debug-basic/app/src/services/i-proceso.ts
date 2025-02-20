import { Result } from "../common/result";
import { People } from "./models/people";
import { ResultProceso } from "./proceso";


export interface IProceso {
    execute(data: People):  Result<ResultProceso>;
}