FROM node:20

WORKDIR /usr/src/app
COPY ../../app/package*.json ./
RUN npm install

# Copiamos el resto del código: src, tests, etc.
COPY . .

# Exponemos el puerto 9229 para el debugger
EXPOSE 9229

# Por defecto, ejecuta las pruebas en modo debug
CMD ["npm", "run", "test:debug"]
