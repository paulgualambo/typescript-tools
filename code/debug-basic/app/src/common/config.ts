import { z } from 'zod'; // Para validación de tipos

// Definir un esquema de validación con Zod
const envSchema = z.object({
  APP_NAME: z.string(),
  APP_CODE: z.string(),
  CURRENCY_CHANGE_TYPE: z.string().transform((val) => parseFloat(val)), // Convertir a número
  SETTINGS_DB: z.string().transform((val) => JSON.parse(val)), // Convertir a objeto
  END_POINT: z.string(), // Mantener como cadena
});

export class Enviroment {
  public readonly APP_NAME: string
  public readonly APP_CODE: string
  public readonly CURRENCY_CHANGE_TYPE: string;
  public readonly SETTINGS_DB: string;
  public readonly END_POINT: string;

  constructor() {
    const rawEnv = {
      APP_NAME: process.env.APP_NAME,
      APP_CODE: process.env.APP_CODE,
      CURRENCY_CHANGE_TYPE: process.env.CURRENCY_CHANGE_TYPE,
      SETTINGS_DB: process.env.SETTINGS_DB,
      END_POINT: process.env.END_POINT,
    };

    const parsedEnv = envSchema.parse(rawEnv);
    this.APP_NAME = parsedEnv.APP_NAME
    this.APP_CODE = parsedEnv.APP_CODE
    this.CURRENCY_CHANGE_TYPE = parsedEnv.CURRENCY_CHANGE_TYPE.toString()
    this.SETTINGS_DB = parsedEnv.SETTINGS_DB
    this.END_POINT = parsedEnv.END_POINT
  }
}

 export default class Config {

  public static enviroment: Enviroment

  static getInstance(): Enviroment {
    if (!this.enviroment) {
      this.enviroment = new Enviroment()
    }

    return this.enviroment
  }
}