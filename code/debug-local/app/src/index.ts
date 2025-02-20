import { Proceso } from "./module/proceso";


export function main(input: any): void {
    try {
        const proc = new Proceso<any>();
        proc.process(input);
        console.log("Dato:", proc.getData());
    } catch (error) {
        console.error("Error al ejecutar los casos:", error);
    }
}
