import { main } from "../src/handlers/myHandler";

main({ /* un event de prueba */ } as any, {} as any).then(() => {
    console.log("Lambda ejecutada con éxito.");
});
  