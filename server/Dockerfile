FROM node:alpine

WORKDIR /server

COPY package.json .
COPY package-lock.json .
COPY dist/index.js .

RUN npm install --production

EXPOSE 3050

CMD node index