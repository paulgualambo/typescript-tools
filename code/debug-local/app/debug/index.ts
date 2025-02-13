import http from 'http';
import { sumar } from '../src/module/service';

const server = http.createServer((req, res) => {
  // Ejecuta la función para demostrar que funciona
  const resultado = sumar(24, 20);
  console.log("El resultado de la suma es:", resultado);
  res.end('Hello from Node inside Docker!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});