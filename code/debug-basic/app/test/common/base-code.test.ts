import { AppResultProcessCode } from '../../src/common/process-code/base-code';

describe('AppResultProcessCode', () => {
  test('should format message using sprintf when arguments are provided', () => {
    // Arrange
    const codeObj = { code: "CODE1", message: "Hello %s world" };
    // Act
    const result = AppResultProcessCode.getMessage(codeObj, "beautiful");
    // Assert: sprintf should substitute the argument in the message.
    expect(result).toBe("CODE1 - Hello beautiful world");
  });

  test('should replace "%s" with an empty string when no arguments are provided', () => {
    // Arrange
    const codeObj = { code: "CODE2", message: "Goodbye %s" };
    // Act
    const result = AppResultProcessCode.getMessage(codeObj);
    // Assert: Without arguments, "%s" is replaced with an empty string.
    expect(result).toBe("CODE2 - Goodbye ");
  });

  test('should work correctly when message does not contain "%s"', () => {
    // Arrange
    const codeObj = { code: "CODE3", message: "No substitution" };
    // Act
    const result = AppResultProcessCode.getMessage(codeObj);
    // Assert: The message remains unchanged as there is no "%s" to replace.
    expect(result).toBe("CODE3 - No substitution");
  });

  test('should format message with multiple substitutions when arguments are provided', () => {
    // Arrange
    const codeObj = { code: "CODE4", message: "%s and %s" };
    // Act
    const result = AppResultProcessCode.getMessage(codeObj, "first", "second");
    // Assert: All placeholders should be replaced in order.
    expect(result).toBe("CODE4 - first and second");
  });
});
