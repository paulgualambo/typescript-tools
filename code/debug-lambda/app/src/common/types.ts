export const TYPES = {
  DomainService: Symbol.for("DomainService"),
  LoggerService: Symbol.for("LoggerService"),
  BaseHandler: Symbol.for("BaseHandler"),
};

// Ejemplo de tipo de evento (puedes ajustarlo a tus necesidades)
export interface MyEvent {
  myArray: string[];
  userId: string;
  [key: string]: any; // para atributos adicionales
}
