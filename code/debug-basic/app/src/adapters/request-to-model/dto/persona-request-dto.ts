import "reflect-metadata";

import { Expose, Type } from "class-transformer";

// Representa la skill de PersonaRequest
export class InputSkillDTO {
    @Expose()
    nombre!: string;
  
    @Expose()
    descripcion?: string;
  }

export class PersonaRequestDTO {
  @Expose()
  nombre!: string;

  @Expose()
  apellidos!: string;

  // Convertimos string -> Date si viene en string ISO (class-transformer lo hace si usas @Type)
  // Ojo: si tu dato ya es Date real, igual se mantiene
  @Expose()
  @Type(() => Date)
  fechaNacimiento!: Date;

  @Expose()
  pais!: string;

  @Expose()
  correo!: string;

  @Expose()
  telefono!: string;

  // array de string opcional
  @Expose()
  hobbies?: string[];

  // array de InputSkillDTO opcional
  @Expose()
  @Type(() => InputSkillDTO)
  skills?: InputSkillDTO[];

  @Expose()
  experienciaAnios?: number;

  @Expose({ name: "activo" })
  isActive!: boolean;
}
