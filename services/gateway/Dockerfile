FROM node:18

EXPOSE 8000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

CMD npm start