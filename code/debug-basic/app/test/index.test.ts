import { main } from "../src/index";
import logger from "../src/common/logger";
import { Proceso, ResultProceso } from "../src/services/proceso";
import { PersonaRequest, PersonaRequestFixedDataType } from "../src/persona-request";
import { PersonRequestValidator } from "../src/persona-request-validator";
import { PersonaRequestToPersonMapper } from "../src/adapters/request-to-model/persona-request-to-people-mapper";
import { AppResultProcessCode } from "../src/common/process-code/base-code";
import { ProcessCodes } from "../src/common/process-code/process-codes";
import { Result, STATUS } from "../src/common/result";
import { People, PeopleFixedDataType } from "../src/services/models/people";
import { AppError } from "../src/common/process-code/error-code";

//import data input output
import PersonaRequestData from './resources/data-test/persona-request.json'
import PeopleData from './resources/data-test/people.json'

const fixedInput = { fixed: "input" };
const PersonaRequestDataFixed = PersonaRequestFixedDataType.execute(PersonaRequestData.validate1)
const PeopleDataFixed = PeopleFixedDataType.execute(PeopleData.validate1)

const validatedData = new Result<PersonaRequest>(
    PersonaRequestDataFixed
    ,STATUS.SUCCESS
);

const transformedData = new Result<People>(
    PeopleDataFixed
  , STATUS.SUCCESS
);

const resultProceso = new Result<ResultProceso>(
  {
    idUser: "",
    fullname: "Ana Lopez",
    email: "ana.lopez@example.com",
  },
  STATUS.SUCCESS
);

describe("Main function", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Spy on the logger methods to intercept log messages.
    // The mock implementation returns the logger to satisfy the expected return type.
    jest.spyOn(logger, "info").mockImplementation(() => logger);
    jest.spyOn(logger, "debug").mockImplementation(() => logger);
    jest.spyOn(logger, "error").mockImplementation(() => logger);

    // MOCK: Intercept the static execute function of PersonaRequestFixedDataType to return fixedInput.
    jest.spyOn(PersonaRequestFixedDataType, "execute").mockReturnValue(PersonaRequestDataFixed);

    // MOCK: For PersonRequestValidator, create an instance and intercept its execute method to return validatedData.
    jest
      .spyOn(PersonRequestValidator.prototype, "execute")
      .mockReturnValue(validatedData);

    // MOCK: For PersonaRequestToPersonMapper, intercept the mapper method to return transformedData.
    jest
      .spyOn(PersonaRequestToPersonMapper.prototype, "mapper")
      .mockReturnValue(transformedData);

    // MOCK: For Proceso, intercept the execute method to return resultProceso.
    jest.spyOn(Proceso.prototype, "execute").mockReturnValue(resultProceso);
  });

  it("should process the request and log all messages correctly", () => {
    // Execute the main function with the fake request
    main(PersonaRequestData.validate1);

    // Check that the logger was called with the start process message and the correct request object
    expect(logger.info).toHaveBeenCalledWith(
      AppResultProcessCode.getMessage(ProcessCodes.LOG_INFO_MAIN_START_PROCESS),
      { request: PersonaRequestData.validate1 }
    );

    // Ensure that the static execute function of PersonaRequestFixedDataType was called with the fake request
    expect(PersonaRequestFixedDataType.execute).toHaveBeenCalledWith(PersonaRequestData.validate1);

    // Validate that the request is processed and logged correctly:
    // - The PersonRequestValidator is called with the fixed input.
    // - Logger logs the validated data.
    expect(PersonRequestValidator.prototype.execute).toHaveBeenCalledWith(PersonaRequestDataFixed);
    expect(logger.info).toHaveBeenCalledWith(
      AppResultProcessCode.getMessage(ProcessCodes.LOG_INFO_MAIN_VALIDATE_DATA),
      { dataVerificada: validatedData.getData() }
    );

    // Validate that the transformation to Person is performed:
    // - The PersonaRequestToPersonMapper is called with the validated data.
    // - Logger logs the transformed data.
    expect(PersonaRequestToPersonMapper.prototype.mapper).toHaveBeenCalledWith(
      validatedData.getData()
    );
    expect(logger.info).toHaveBeenCalledWith(
      AppResultProcessCode.getMessage(ProcessCodes.LOG_INFO_MAIN_TRANSFORM_DATA),
      { dataVerificada: validatedData.getData() }
    );

    // Validate that the process execution is performed:
    // - The Proceso execute method is called with the transformed data.
    // - Logger logs the final process result.
    expect(Proceso.prototype.execute).toHaveBeenCalledWith(transformedData.getData());
    expect(logger.info).toHaveBeenCalledWith(
      AppResultProcessCode.getMessage(ProcessCodes.LOG_INFO_MAIN_END_PROCESS),
      { resultProceso: resultProceso.getData() }
    );

    // Ensure the final success log message is logged.
    expect(logger.info).toHaveBeenCalledWith(
      AppResultProcessCode.getMessage(ProcessCodes.SUCCESS_MAIN)
    );
  });

  test("should call logger.error with the AppError message", () => {
    // Create a dummy AppError with a specific error code.
    const dummyError = new AppError({
      codeError: ProcessCodes.ERROR_REQUEST_DATA,
    });

    // SIMULATION: Make the static execute function throw an AppError.
    jest.spyOn(PersonaRequestFixedDataType, "execute").mockImplementation(() => {
      throw dummyError;
    });

    // Spy on logger.error and provide a mock that returns the logger to match the expected type.
    const loggerErrorSpy = jest.spyOn(logger, "error").mockImplementation(() => logger);

    // Execute the main function with an empty request to trigger the error.
    main({});

    // Verify that logger.error was called with the error message returned by dummyError.getMessage()
    expect(loggerErrorSpy).toHaveBeenCalledWith(dummyError.getMessage());
  });

  test("should call logger.error with the generic Error object", () => {
    const dummyErrorMessage = "Message error";
    const dummyError = new Error(dummyErrorMessage);

    // SIMULATION: Make the static execute function throw a generic Error.
    jest.spyOn(PersonaRequestFixedDataType, "execute").mockImplementation(() => {
      throw dummyError;
    });

    // Spy on logger.error and provide a mock that returns the logger to satisfy the function signature.
    const loggerErrorSpy = jest.spyOn(logger, "error").mockImplementation(() => logger);

    // Execute the main function with an empty request to trigger the error.
    main({});

    // Verify that logger.error was called with the generic error object.
    expect(loggerErrorSpy).toHaveBeenCalledWith(dummyError);
  });
});
