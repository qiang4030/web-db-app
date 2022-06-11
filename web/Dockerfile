FROM node:16-alpine
WORKDIR /web-db-app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm" ,"start"]