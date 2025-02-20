# Fase de build para compilar el TypeScript
FROM node:20.18.3-alpine3.21 AS builder
ENV NODE_ENV=development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Fase final para ejecutar
FROM node:20.18.3-alpine3.21
ENV NODE_ENV=development
WORKDIR /usr/src/app

# Copiamos solo el dist y los node_modules, para que la imagen sea más ligera
COPY --from=builder /app/node_modules ./node_modules

# Exponemos el puerto de depuración (9229)
EXPOSE 9229

# Usar nodemon para mantener el contenedor en ejecución
CMD ["npx", "ts-node", "-r", "dotenv/config", "--project", "execute/tsconfig.json", "execute/local.ts"]
