import { main } from "../src/handlers/myHandler";
import event from "./input.json";

(async () => {
    try {
        const result = await main(
            event.validate as any, {} as any).then(() => {
                //console.log("Lambda ejecutada con éxito.");
            });
        console.dir(result);    //console.log("Ejecutando lambda...");
    } catch (error) {
        console.error("Error al ejecutar lambda:", error);
    }

})();
