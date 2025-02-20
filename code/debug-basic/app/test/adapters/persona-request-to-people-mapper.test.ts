import { PersonaRequestToPersonMapper } from "../../src/adapters/request-to-model/persona-request-to-people-mapper";
import { PersonaRequest, PersonaRequestFixedDataType } from "../../src/persona-request";
import { People } from "../../src/services/models/people";
import PersonaRequestData from '../resources/data-test/persona-request.json'

describe("transformPersonaRequestToPerson", () => {
    const fixedCurrentDate = new Date("1985-01-08");

    beforeAll(() => {
        jest.useFakeTimers({ legacyFakeTimers: false });
        jest.setSystemTime(fixedCurrentDate);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it("validate edad and hobbies empty and address", () => {
        // Arrange: se define un input válido (PersonaRequest)
        const persona = JSON.parse(JSON.stringify(PersonaRequestData.validate1)) as PersonaRequest
        persona.fechaNacimiento = new Date("1983-01-08");
        persona.hobbies = undefined
        persona.skills = undefined
        persona.pais = ""
        const input = PersonaRequestFixedDataType.execute(persona);

        // Act: se transforma el input
        const person: People = new PersonaRequestToPersonMapper().mapper(input).getData();

        // Assert: se verifica que se haya generado un id
        expect(person.id).toBeDefined();
        expect(typeof person.id).toBe("string");

        // Assert: se forma el nombre completo correctamente
        expect(person.name).toBe("Juan Perez");

        // Assert: se calcula correctamente la edad
        expect(person.age).toBe(2);
    })

    it("transforma correctamente un PersonaRequest a Person", () => {
        // Arrange: se define un input válido (PersonaRequest)
        const input = PersonaRequestFixedDataType.execute(PersonaRequestData.validate1);

        // Act: se transforma el input
        const person: People = new PersonaRequestToPersonMapper().mapper(input).getData();

        // Assert: se verifica que se haya generado un id
        expect(person.id).toBeDefined();
        expect(typeof person.id).toBe("string");

        // Assert: se forma el nombre completo correctamente
        expect(person.name).toBe("Juan Perez");

        // Assert: se calcula correctamente la edad
        // Con fecha de nacimiento 1990-01-01 y hoy 2025-02-24, se espera 35 años (cumplido el cumpleaños)
        expect(person.age).toBe(0);

        // Assert: se mapea el estado activo
        expect(person.isActive).toBe(true);

        // Assert: se conserva la fecha de nacimiento
        expect(person.birthDate).toEqual(new Date("1984-02-08"));

        // Assert: se asignan los hobbies
        expect(person.hobbies).toEqual(["lectura"]);

        // Assert: se mapea la dirección con valores por defecto y el campo 'pais'
        expect(person.address).toEqual(
            expect.objectContaining({
                street: "Default Street",
                number: 0,
                city: "Mexico",
            })
        );

        // Assert: se mapean correctamente los skills
        expect(person.skills).toHaveLength(2);
        expect(person.skills[0]).toEqual(
            expect.objectContaining({
                name: "TypeScript",
                level: 2, // dado que se proporcionó 'descripcion'
            })
        );
        expect(person.skills[1]).toEqual(
            expect.objectContaining({
                name: "JavaScript",
                level: 1, // sin 'descripcion'
            })
        );

        // Assert: se asigna la metadata
        expect(person.metadata).toEqual({
            pais: "Mexico",
            correo: "juan.perez@example.com",
            telefono: "123456789",
            experienciaAnios: 5,
        });

        // Opcional: verificar que los campos tipo Date (createdAt, updatedAt, address.createdAt, skills.startDate) sean instancias de Date
        expect(person.createdAt).toBeInstanceOf(Date);
        expect(person.updatedAt).toBeInstanceOf(Date);
        expect(person.address.createdAt).toBeInstanceOf(Date);
        person.skills.forEach(skill => {
            expect(skill.startDate).toBeInstanceOf(Date);
        });
    });
});