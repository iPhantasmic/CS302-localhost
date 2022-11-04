FROM node:16.18-alpine3.15

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

CMD npm start