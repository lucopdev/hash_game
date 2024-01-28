FROM node:16.14-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 40000

ENTRYPOINT ["npm", "run"]

CMD ["dev"]