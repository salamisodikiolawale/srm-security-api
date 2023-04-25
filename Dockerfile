FROM node:16

RUN npm i -g @nestjs/cli

WORKDIR /app

ADD package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD nest start --watch