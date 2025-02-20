import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  verbose: true,  
  // Si tus archivos de prueba están en la carpeta "tests":
  testMatch: ["**/test/**/*.test.ts"],

};

export default config;
