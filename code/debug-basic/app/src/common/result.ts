export enum STATUS {
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",
    ERROR = "ERROR"
  }

export class Result<T> {
    private data: T;
    private status: STATUS;
    private message?: string;

    constructor(data: T, success: STATUS, message?: string) {
        this.status = success
        this.data = data;
        this.message = message
    }

    get(): { data: T, success: STATUS, message?:string } {
        return {
            data: this.data,
            success: this.status,
            message: this.message
        };
    }

    getData(): T{
        return this.data
    }

    getStatus(): STATUS{
        return this.status
    }

    getMessage(): string | undefined{
        return this.message
    }
}