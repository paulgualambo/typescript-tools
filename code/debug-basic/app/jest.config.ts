import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testMatch: ['**/test/**/*.test.ts'],

  // Activa la cobertura
  collectCoverage: true,

  // Asegura que instrumente todos los archivos de "src"
  // (pero excluye .d.ts o directorios específicos si quieres)
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',      // si tienes carpetas "__tests__"
    '!src/**/*.test.ts'          // o si no quieres que instrumente los test
  ],

  // Opcional: define a dónde se guardan los reportes de cobertura y su formato
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};

export default config;
