FROM node:12.14.1-alpine

WORKDIR /usr/src/app

COPY ./frontend/package.json /usr/src/app/

RUN npm install

COPY . .

CMD [ "npm", "run", "build" ]