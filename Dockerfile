FROM node:19-slim

WORKDIR /app

RUN npm install -g serve

# Instalacion de dependencias
ADD ./package*.json ./
RUN npm ci

COPY . .
RUN npm run build

CMD ["serve", "-s", "build"]