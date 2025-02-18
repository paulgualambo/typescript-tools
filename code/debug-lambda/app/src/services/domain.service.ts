import { injectable } from "inversify";

@injectable()
export class DomainService {
  public processArray(strings: string[]): string {
    // Ejemplo: retornar un mensaje con la longitud
    return `El array contiene ${strings.length} elemento(s).`;
  }
}
