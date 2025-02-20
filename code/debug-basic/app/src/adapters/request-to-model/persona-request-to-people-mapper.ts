// mappers/persona-to-person.mapper.ts
import { plainToInstance } from "class-transformer";
import { PersonaRequestDTO } from "./dto/persona-request-dto";
import { People } from "../../services/models/people";
import { PersonaRequest } from "../../persona-request"
import { v4 as uuid } from "uuid"; // Ejemplo para generar ID aleatorio
import { Result, STATUS } from "../../common/result";

export class PersonaRequestToPersonMapper {

  private buildDTO(input: PersonaRequest) {

    const dto = plainToInstance(PersonaRequestDTO, input, {
      excludeExtraneousValues: true, // descarta campos no marcados con @Expose
    });

    return dto
  }

  private buildSkills(dto: PersonaRequestDTO) {
    return dto.skills?.map((sk) => {
      return {
        name: sk.nombre,
        // Lógica arbitraria para "level"
        level: sk.descripcion ? 2 : 1,
        startDate: new Date(),
      };
    }) ?? [];
  }

  private preMapper(input: PersonaRequest) {

    const dto = this.buildDTO(input)

    const today = new Date();
    let age = today.getFullYear() - dto.fechaNacimiento.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > dto.fechaNacimiento.getMonth() ||
      (today.getMonth() === dto.fechaNacimiento.getMonth() &&
        today.getDate() >= dto.fechaNacimiento.getDate());
    if (!hasHadBirthdayThisYear) {
      age--;
    }

    const person: People = {
      id: uuid(),
      name: `${dto.nombre} ${dto.apellidos}`,
      age: age,
      isActive: dto.isActive,
      birthDate: dto.fechaNacimiento,
      createdAt: new Date(),
      updatedAt: new Date(),
      hobbies: dto.hobbies ?? [],
      email: dto.correo,
      address: {
        street: "Default Street",
        number: 0,
        city: dto.pais,
        createdAt: new Date(),
      },
      skills: this.buildSkills(dto),
      metadata: {
        // Almacena info adicional o no mapeada
        pais: dto.pais,
        correo: dto.correo,
        telefono: dto.telefono,
        experienciaAnios: dto.experienciaAnios,
      },
    };

    return person;
  }

  public mapper(input: PersonaRequest): Result<People> {
    const person = this.preMapper(input)
    return new Result<People>(person, STATUS.SUCCESS)
  }
}