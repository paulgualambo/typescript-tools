# Fase de build para compilar el TypeScript
FROM node:20 AS builder
ENV NODE_ENV=development
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
# Ahora /app/dist contiene el JS compilado

# Fase final para ejecutar
FROM node:20

WORKDIR /usr/src/app
# Copiamos solo el dist y los node_modules, para que la imagen sea más ligera
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Exponemos el puerto de depuración (9229)
EXPOSE 9229

# Usar nodemon para mantener el contenedor en ejecución
CMD ["npm", "run", "debug"]
