import { sprintf } from "sprintf-js";

export class AppError extends Error {
  public code: string;

  public getMessage() {
    return this.message;
  }


  constructor(error: { codeError: { code: string; message: string }, message?: string, args?: string[], stack?: any }) {
    const formattedMessage = (error.args && error.args.length > 0) ? sprintf(error.codeError.message, error.args) : error.codeError.message.replace('%s', '');

    // Construir el mensaje completo usando un arreglo y join
    const segments = [error.codeError.code, formattedMessage];
    if (error.message) {
      segments.push(error.message);
    }
    const fullMessage = segments.join(" - ");

    super(fullMessage);
    this.code = error.codeError.code;
    this.message = fullMessage;
    this.stack = error.stack;
  }
}
