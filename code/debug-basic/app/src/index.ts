import { Proceso } from "./services/proceso";
import logger from './common/logger';
import { ProcessCodes } from "./common/process-code/process-codes";
import { AppError } from "./common/process-code/error-code";
import { PersonaRequestToPersonMapper } from "./adapters/request-to-model/persona-request-to-people-mapper";
import { AppResultProcessCode } from "./common/process-code/base-code";
import { PersonRequestValidator } from "./persona-request-validator";
import { PersonaRequestFixedDataType } from "./persona-request";

export function main(request: any): void {
    try {        
        //start execution
        logger.info(AppResultProcessCode.getMessage(ProcessCodes.LOG_INFO_MAIN_START_PROCESS), { request });
        logger.debug(AppResultProcessCode.getMessage(ProcessCodes.LOG_INFO_MAIN_START_PROCESS), { request });
        const input = PersonaRequestFixedDataType.execute(request)

        //Validación de la data entrada format and remote
        const dataVerificada = new PersonRequestValidator().execute(input).getData()
        logger.info(AppResultProcessCode.getMessage(ProcessCodes.LOG_INFO_MAIN_VALIDATE_DATA), { dataVerificada });
        logger.debug(AppResultProcessCode.getMessage(ProcessCodes.LOG_INFO_MAIN_VALIDATE_DATA), { dataVerificada });

        //Transformación de la data para procesar   
        const dataTransformada = new PersonaRequestToPersonMapper().mapper(dataVerificada).getData()    
        logger.info(AppResultProcessCode.getMessage(ProcessCodes.LOG_INFO_MAIN_TRANSFORM_DATA), { dataVerificada });
        logger.debug(AppResultProcessCode.getMessage(ProcessCodes.LOG_INFO_MAIN_TRANSFORM_DATA), { dataVerificada });

        //Proceso de datos
        const proceso = new Proceso();
        const resultProceso = proceso.execute(dataTransformada).getData()
        logger.info(AppResultProcessCode.getMessage(ProcessCodes.LOG_INFO_MAIN_END_PROCESS), { resultProceso });
        logger.debug(AppResultProcessCode.getMessage(ProcessCodes.LOG_INFO_MAIN_END_PROCESS), { resultProceso })

        //Formateo de resultados
        logger.info(AppResultProcessCode.getMessage(ProcessCodes.SUCCESS_MAIN));
    } catch (error) {
        if(error instanceof AppError){
            logger.error(error.getMessage());
        }else{
            logger.error(error)
        }
    } finally { 
        logger.info(AppResultProcessCode.getMessage(ProcessCodes.LOG_INFO_MAIN_END_PROCESS));
    }
}
