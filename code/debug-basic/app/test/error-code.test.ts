import { AppError } from "../src/common/process-code/error-code";

describe("AppError", () => {
  it("debería construir el mensaje de error correctamente sin argumentos adicionales", () => {
    const errorInput = {
      codeError: { code: "ERR002", message: "Simple error message" }
    };

    const errorInstance = new AppError(errorInput);
    const expectedMessage = "ERR002 - Simple error message";

    expect(errorInstance.code).toBe("ERR002");
    expect(errorInstance.message).toBe(expectedMessage);
    expect(errorInstance.getMessage()).toBe(expectedMessage);
  });
  
  it("debería construir el mensaje de error correctamente con argumentos y mensaje adicional", () => {
    const errorInput = {
      codeError: { code: "ERR001", message: "Error: %s not found" },
      args: ["File"],
      message: "Additional error message"
    };

    const errorInstance = new AppError(errorInput);
    const expectedMessage = "ERR001 - Error: File not found - Additional error message";

    expect(errorInstance.code).toBe("ERR001");
    expect(errorInstance.message).toBe(expectedMessage);
    expect(errorInstance.getMessage()).toBe(expectedMessage);
  });
});