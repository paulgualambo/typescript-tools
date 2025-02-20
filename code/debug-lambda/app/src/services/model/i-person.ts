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

export interface Person {
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
    metadata: Record<string, any>;
}