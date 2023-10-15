FROM node:18

EXPOSE 4001

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

CMD npm start