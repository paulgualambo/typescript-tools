import { env } from "../common/config";
import { IProceso } from "./i-proceso";

export class Proceso<T> implements IProceso<T> {
    private data: T | undefined;

    constructor() {
    }

    process(data: T): void {
        this.data = data;
        const envVar = env;
        console.dir(envVar, { depth: 0 });
        
        if (typeof data === 'number') {
            console.log("Procesando número primitivo:", data + 10);
        } else if (typeof data === 'string') {
            console.log("Procesando cadena primitiva:", data + " procesada");
        } else if (typeof data === 'object' && data !== null) {
            console.log("Procesando objeto completo:", { ...data });
        } else {
            console.log("Procesando dato:", data);
        }
    }

    getData(): T | undefined {
        return this.data;
    }
}