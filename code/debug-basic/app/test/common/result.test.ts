import { Result, STATUS } from '../../src/common/result';

describe('Result class', () => {
  test('should return correct values when a message is provided', () => {
    // Arrange: Create a Result with a number, success status, and a message.
    const result = new Result<number>(42, STATUS.SUCCESS, 'Operation successful');

    // Act & Assert: Verify that getData, getStatus, and getMessage return the expected values.
    expect(result.getData()).toBe(42);
    expect(result.getStatus()).toBe(STATUS.SUCCESS);
    expect(result.getMessage()).toBe('Operation successful');

    // Verify that get() returns the complete object.
    expect(result.get()).toEqual({
      data: 42,
      success: STATUS.SUCCESS,
      message: 'Operation successful'
    });
  });

  test('should return correct values when no message is provided', () => {
    // Arrange: Create a Result with a string and error status, without a message.
    const result = new Result<string>('Error occurred', STATUS.ERROR);

    // Act & Assert: Verify that getData and getStatus return expected values, and getMessage is undefined.
    expect(result.getData()).toBe('Error occurred');
    expect(result.getStatus()).toBe(STATUS.ERROR);
    expect(result.getMessage()).toBeUndefined();

    // Verify that get() returns the complete object with message as undefined.
    expect(result.get()).toEqual({
      data: 'Error occurred',
      success: STATUS.ERROR,
      message: undefined
    });
  });

  test('should handle object data correctly', () => {
    // Arrange: Create a Result with an object and warning status.
    const payload = { foo: 'bar' };
    const result = new Result<object>(payload, STATUS.WARNING, 'Warning message');

    // Act & Assert: Verify that getData, getStatus, and getMessage return the expected values.
    expect(result.getData()).toEqual(payload);
    expect(result.getStatus()).toBe(STATUS.WARNING);
    expect(result.getMessage()).toBe('Warning message');

    // Verify that get() returns the complete object.
    expect(result.get()).toEqual({
      data: payload,
      success: STATUS.WARNING,
      message: 'Warning message'
    });
  });
});
