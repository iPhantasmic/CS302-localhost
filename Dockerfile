FROM node:16.18-alpine3.15

WORKDIR /

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

CMD npm start