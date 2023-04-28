FROM node:18.14

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]