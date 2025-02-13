import { sumar } from "../src/module/service";


describe('Pruebas de la función sum', () => {
  test('sumar 2 + 3 debe retornar 5', () => {
    const resultado = sumar(2, 3);
    expect(resultado).toBe(5);
  });

  test('sumar valores negativos', () => {
    const resultado = sumar(-5, -7);
    expect(resultado).toBe(-12);
  });
});
