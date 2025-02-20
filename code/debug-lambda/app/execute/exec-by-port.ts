import http from 'http';
import { main } from '../src/handlers/myHandler';
import Input from "./input.json"

const server = http.createServer((req, res) => {
  // Ejecuta la función para demostrar que funciona
  const resultado = main(Input, {} as any);
  console.log("Ejecucion del lambda:", resultado);
  res.end('Hello from Node inside Docker!');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});