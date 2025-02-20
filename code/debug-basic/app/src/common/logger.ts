import winston from 'winston';
import crypto from 'crypto';
import { obfuscateSensitiveData } from './ofuscate';
//import { env } from './config'

// Genera un hash único para toda la ejecución
const executionHash = crypto.randomBytes(16).toString('hex');

// Formato que añade el executionHash a cada log
const addExecutionHash = winston.format((info) => {
  info.executionHash = executionHash;
  return info;
});

// Configura los niveles de log
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define un formato personalizado
const customFormat = winston.format.printf(info => {
  const { level, message, timestamp, executionHash, ...metadata } = info;
  const splat = (level.toUpperCase() != "DEBUG") ? obfuscateSensitiveData(info[Symbol.for('splat')]) : info[Symbol.for('splat')];
  //const metadataString = Object.keys(metadata).length ? ` ${JSON.stringify(metadata)}` : '';
  const splatString = splat ? ` ${JSON.stringify(splat)}` : '';

  //[${env.appCode}]
  return `[${level.toUpperCase()}] (${timestamp})  [${executionHash}] ${message}${splatString}`;
});


// Define el formato de los logs
const format = winston.format.combine(
  addExecutionHash(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Añade una marca de tiempo
  winston.format.errors({ stack: true }), // Incluye el stack trace en errores
  winston.format.splat(), // Soporte para interpolación de strings
  winston.format.json(), // Formato JSON para los logs
  customFormat
);

// Crea el logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  levels,
  format,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;