import { addDays } from 'date-fns';

import { PersonRequestValidator } from "../src/persona-request-validator";
import { AppError } from "../src/common/process-code/error-code";
import { STATUS } from "../src/common/result";
import { PersonaRequest, PersonaRequestFixedDataType } from "../src/persona-request";

import PersonaRequestData from './resources/data-test/persona-request.json'

describe("PersonRequestValidator", () => {
  let validator: PersonRequestValidator;

  beforeEach(() => {
    // Create a new instance for each test (Single Responsibility Principle)
    validator = new PersonRequestValidator();
  });

  test("should return a success result for valid input", () => {

    const PersonaRequestDataFixed = PersonaRequestFixedDataType.execute(PersonaRequestData.validate1)

    // Arrange: Prepare a valid PersonaRequest object
    const validRequest: PersonaRequest = PersonaRequestDataFixed;

    // Act: Validate the request
    const result = validator.execute(validRequest);

    // Assert: Verify the result is successful and data matches input
    expect(result.getStatus()).toBe(STATUS.SUCCESS);
    expect(result.getData()).toEqual(validRequest);
  });

  test("should throw an AppError for invalid input", () => {

    // Arrange: Prepare an invalid PersonaRequest (missing required 'nombre' field)
    const today: Date = new Date();
    const daysToAdd: number = 5; // Specify the number of days to add
    const newDate: Date = addDays(today, daysToAdd);    

    const PersonaRequestDataFixed = { 
        ...PersonaRequestFixedDataType.execute(PersonaRequestData.validate1)
        , fechaNacimiento: newDate
    }
    

    // Act & Assert: Expect the validator to throw an AppError
    expect(() => validator.execute(PersonaRequestDataFixed)).toThrow(AppError);
  });
});
