FROM node:alpine

WORKDIR /client

RUN yarn global add serve

COPY ./build/ .

EXPOSE 3060

CMD ["serve", "-p", "3060", "-s", "."]