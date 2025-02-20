export interface Address {
    street: string;
    number: number;
    city: string;
    createdAt: Date;
}

export interface Skill {
    name: string;
    level: number;
    startDate: Date;
}

export interface People {
    id: string;
    name: string;
    age: number;
    isActive: boolean;
    birthDate: Date;
    createdAt: Date;
    updatedAt: Date;
    hobbies: string[];
    address: Address;
    skills: Skill[];
    email: string;
    metadata: Record<string, any>;
}

export class PeopleFixedDataType {
  
    //Debido a que json no maneja tipos de datos como Date, bigint Map and Set
    static execute(data: any):People {
      return { ...data
        , birthDate: new Date(data.birthDate)
        , createdAt: new Date(data.createdAt)
        , updatedAt: new Date(data.updatedAt)
        , skills: data.skills.map((item : any) => {
            item.startDate = new Date(item.startDate)
            return item
        })
    }
    }
}