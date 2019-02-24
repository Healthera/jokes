FROM node:10.15.1

WORKDIR /app
COPY package.json /app
RUN npm install nodemon -g
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]
