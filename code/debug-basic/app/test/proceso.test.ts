import { Proceso, ResultProceso } from '../src/services/proceso';
import { People } from "../src/services/models/people";
import { Result, STATUS } from "../src/common/result";
import { Buffer } from "buffer";

describe("Proceso", () => {
  let proceso: Proceso;

  beforeEach(() => {
    proceso = new Proceso();
  });

  it("should execute process and return a successful result", () => {
    // Objeto Person de ejemplo según la interfaz
    const person: People = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Ana Lopez",
      age: 27,
      isActive: true,
      birthDate: new Date("1995-08-20T00:00:00.000Z"),
      createdAt: new Date("2023-05-01T12:00:00.000Z"),
      updatedAt: new Date("2023-05-01T12:00:00.000Z"),
      hobbies: ["pintura", "running"],
      address: {
        street: "Main Street",
        number: 123,
        city: "Santiago",
        createdAt: new Date("2023-05-01T12:00:00.000Z")
      },
      skills: [
        {
          name: "Node.js",
          level: 2,
          startDate: new Date("2023-05-01T12:00:00.000Z")
        }
      ],
      email: "ana.lopez@example.com",
      metadata: {
        pais: "Chile",
        telefono: "987654321",
        experienciaAnios: 3
      }
    };

    // Calculamos el idUser a partir del email en base64
    const expectedResult: ResultProceso = {
      idUser: Buffer.from(person.email).toString("base64"),
      fullname: person.name,
      email: person.email
    };

    // Ejecutamos el proceso
    const result = proceso.execute(person);

    expect(result.getStatus()).toBe(STATUS.SUCCESS);    
    expect(result.getData()).toEqual(expectedResult);
  });
});
