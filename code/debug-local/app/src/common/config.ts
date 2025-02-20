import * as dotenv from 'dotenv';
import { z } from 'zod'; // Para validación de tipos

// Cargar las variables de entorno desde .env
dotenv.config();

// Definir un esquema de validación con Zod
const envSchema = z.object({
  CURRENCY_CHANGE_TYPE: z.string().transform((val) => parseFloat(val)), // Convertir a número
  SETTINGS_DB: z.string().transform((val) => JSON.parse(val)), // Convertir a objeto
  END_POINT: z.string(), // Mantener como cadena
});

// Obtener las variables de entorno del proceso
const rawEnv = {
  CURRENCY_CHANGE_TYPE: process.env.CURRENCY_CHANGE_TYPE,
  SETTINGS_DB: process.env.SETTINGS_DB,
  END_POINT: process.env.END_POINT,
};

console.dir(rawEnv, { depth: 0 });
// Validar y tipar las variables de entorno
const parsedEnv = envSchema.parse(rawEnv);

// Exportar las variables de entorno tipadas
export const env = {
  currencyChangeType: parsedEnv.CURRENCY_CHANGE_TYPE,
  settingsDb: parsedEnv.SETTINGS_DB,
  endPoint: parsedEnv.END_POINT,
};