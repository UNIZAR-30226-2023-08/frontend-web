FROM node:19-slim

WORKDIR /app

RUN npm install -g serve

# Instalacion de dependencias
COPY ./package.json .
RUN npm install

COPY . .
RUN npm run build

CMD ["serve", "-s", "build"]