export interface Skill {
  nombre: string;
  descripcion?: string;
}

export interface PersonaRequest {
  nombre: string;
  apellidos: string;
  fechaNacimiento: Date;
  pais: string;
  correo: string;
  telefono: string;
  hobbies?: string[];
  skills?: Skill[];
  experienciaAnios?: number;
  activo: boolean;
}

export class PersonaRequestFixedDataType {
  
  //Debido a que json no maneja tipos de datos como Date, bigint Map and Set
  static execute(data: any): PersonaRequest {
    return { ...data, fechaNacimiento: new Date(data.fechaNacimiento) }
  }

}