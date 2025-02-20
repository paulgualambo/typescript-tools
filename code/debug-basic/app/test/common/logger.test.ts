import logger from '../../src/common/logger';
import winston from 'winston';
import { Writable } from 'stream';
import * as obfuscateModule from '../../src/common/ofuscate';

// Create a custom writable stream to capture log outputs.
class TestStream extends Writable {
  public logs: string[] = [];
  _write(chunk: any, encoding: string, callback: () => void) {
    this.logs.push(chunk.toString());
    callback();
  }
}

describe('Logger Module', () => {
  let testStream: TestStream;
  let testTransport: winston.transport;

  beforeEach(() => {
    // Initialize a new test stream and add a Stream transport to logger.
    testStream = new TestStream();
    testTransport = new winston.transports.Stream({ stream: testStream });
    logger.add(testTransport);
  });

  afterEach(() => {
    // Remove test transport and restore all mocks.
    logger.remove(testTransport);
    jest.restoreAllMocks();
  });

  test('should append execution hash to log output', (done) => {
    // Log an info message.
    logger.info('Test message');
    // Wait for async logging.
    setTimeout(() => {
      // Combine all logged output.
      const output = testStream.logs.join('');
      // Check that output includes a 32-character hex string (the execution hash)
      expect(output).toMatch(/[0-9a-f]{32}/);
      done();
    }, 50);
  });

  test('should obfuscate sensitive data for non-debug logs', (done) => {
    // Spy on obfuscateSensitiveData and force a fixed return value.
    const spy = jest
      .spyOn(obfuscateModule, 'obfuscateSensitiveData')
      .mockReturnValue('obfuscated');
    // Log an info message with a splat argument.
    logger.info('Test message %s', 'sensitiveData');
    setTimeout(() => {
      const output = testStream.logs.join('');
      // Check that the obfuscated value appears in the log output.
      expect(output).toContain('obfuscated');
      // Ensure obfuscateSensitiveData was called.
      expect(spy).toHaveBeenCalled();
      done();
    }, 50);
  });

  test('should not obfuscate sensitive data for debug logs', (done) => {
    // Set logger level to debug so debug messages are processed.
    logger.level = 'debug';
    // Spy on obfuscateSensitiveData.
    const spy = jest.spyOn(obfuscateModule, 'obfuscateSensitiveData');
    // Log a debug message with a splat argument.
    logger.debug('Debug message %s', 'sensitiveData');
    setTimeout(() => {
      const output = testStream.logs.join('');
      // The original sensitive string should be visible in debug logs.
      expect(output).toContain('sensitiveData');
      // For debug level, the obfuscation function should not be called.
      expect(spy).not.toHaveBeenCalled();
      done();
    }, 50);
  });

  test('should log error messages correctly', (done) => {
    // Log an error message.
    logger.error('An error occurred');
    setTimeout(() => {
      const output = testStream.logs.join('');
      // Check that the error message is in the output.
      expect(output).toContain('An error occurred');
      done();
    }, 50);
  });
});
