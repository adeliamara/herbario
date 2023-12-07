FROM node:18.12

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm i -g @nestjs/cli

RUN npm install 

RUN npm install --save @nestjs/jwt

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]