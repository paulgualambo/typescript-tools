import { Proceso } from '../src/module/proceso';

describe('Proceso', () => {
    let consoleSpy: jest.SpyInstance;

    // Configuración inicial antes de cada prueba
    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    // Limpieza después de cada prueba
    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('constructor', () => {
        it('debería inicializar correctamente con datos de tipo number', () => {
            const proceso = new Proceso<number>();
            proceso.process(42);
            expect(proceso.getData()).toBe(42);
        });

        it('debería inicializar correctamente con datos de tipo string', () => {
            const proceso = new Proceso<string>();
            proceso.process('hola');
            expect(proceso.getData()).toBe('hola');
        });

        it('debería inicializar correctamente con datos de tipo object', () => {
            const data = { key: 'value' };
            const proceso = new Proceso<object>();
            proceso.process(data);
            expect(proceso.getData()).toEqual(data);
        });
    });

    describe('process', () => {
        it('debería procesar un número correctamente', () => {
            const proceso = new Proceso<number>();
            proceso.process(5);
            expect(consoleSpy).toHaveBeenCalledWith('Procesando número primitivo:', 15);
        });

        it('debería procesar una cadena correctamente', () => {
            const proceso = new Proceso<string>();
            proceso.process('prueba');
            expect(consoleSpy).toHaveBeenCalledWith('Procesando cadena primitiva:', 'prueba procesada');
        });

        it('debería procesar un objeto correctamente', () => {
            const data = { nombre: 'objeto', valor: 42 };
            const proceso = new Proceso<object>();
            proceso.process(data);
            expect(consoleSpy).toHaveBeenCalledWith('Procesando objeto completo:', { ...data });
        });

        it('debería procesar otros tipos de datos correctamente', () => {
            const proceso = new Proceso<boolean>();
            proceso.process(true);
            expect(consoleSpy).toHaveBeenCalledWith('Procesando dato:', true);
        });
    });

    describe('getData', () => {
        it('debería devolver los datos iniciales sin modificarlos', () => {
            const data = { key: 'value' };
            const proceso = new Proceso<object>();
            proceso.process(data);
            expect(proceso.getData()).toBe(data);
        });
    });
});