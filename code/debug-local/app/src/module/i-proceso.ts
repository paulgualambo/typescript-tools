export interface IProceso<T> {
    process(data: T): void;
    getData(): T | undefined;
}