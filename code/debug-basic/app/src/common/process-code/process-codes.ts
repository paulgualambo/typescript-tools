//APP: debug-basic => DB
//LI = LOG info
//DB = debug-basic
//ER = error
//SU = success
//WR = warning

export const ProcessCodes = {
    LOG_INFO_MAIN_START_PROCESS: { type: "L", code: "DB-LI001", message: "Start process %s" },
    LOG_INFO_MAIN_VALIDATE_DATA: { type: "L", code: "DB-LI001", message: "Validate data success %s" },
    LOG_INFO_MAIN_TRANSFORM_DATA: { type: "L", code: "DB-LI001", message: "Transform data success %s" },
    LOG_INFO_MAIN_END_PROCESS: { type: "L", code: "DB-LI002", message: "End process %s" },
    LOG_INFO_START_WRITE_FILE: { type: "L", code: "DB-LI003", message: "Start write file %s" },

    ERROR_UNKNOWN: { type: "E", code: "DB-ER000", message: "Error unknown" },
    ERROR_REQUEST_DATA: { type: "E", code: "DB-ER001", message: "Requesta data error" },
    ERROR_MAIN: { type: "E", code: "DB-ER002", message: "Error main %s" },

    SUCCESS_MAIN: { type: "S", code: "DB-SU001", message: "Success main %s" },
}