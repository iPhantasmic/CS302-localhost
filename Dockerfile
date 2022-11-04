FROM node:16.18-alpine3.15

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD npm start