# Nodejs + MySQL + docker-compose

## catalogue

- [Nodejs + MySQL + docker-compose](#nodejs--mysql--docker-compose)
  - [catalogue](#catalogue)
  - [Dockerizing nodejs backend](#dockerizing-nodejs-backend)
    - [Step 1: Create Nodejs Backend](#step-1-create-nodejs-backend)
    - [Step 2: Write the following code in index.js](#step-2-write-the-following-code-in-indexjs)
    - [Step 3: Dockerize the backend](#step-3-dockerize-the-backend)
  - [Dockerizing MYSQL](#dockerizing-mysql)
    - [Step 1: Create db folder in the root directory and cd into it, and then create files named testdump.sql, Dockerfile](#step-1-create-db-folder-in-the-root-directory-and-cd-into-it-and-then-create-files-named-testdumpsql-dockerfile)
    - [Step 2: Edit the file Dockerfile in the db folder](#step-2-edit-the-file-dockerfile-in-the-db-folder)
  - [Create docker-compose file](#create-docker-compose-file)
    - [Step 1: Create the file docker-compose.yml](#step-1-create-the-file-docker-composeyml)
    - [Step 2: Edit the file `docker-compose.yml`](#step-2-edit-the-file-docker-composeyml)
  - [Run the app](#run-the-app)

## Dockerizing nodejs backend

### Step 1: Create Nodejs Backend

```sh
# create a backend folder
mkdir web & cd web
# initialize it with npm
npm init -y
# install express for creating a route and mysql for communicating with MySQL Database
npm install express mysql
# Finally create index.js
touch index.js
```

### Step 2: Write the following code in index.js

```js
const express = require("express");
const mysql = require("mysql");
const app = express();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "123456",
  database: process.env.MYSQL_DATABASE || "icoding",
});

app.get("/", (req, res) => {
  const sql = "select * from tutorials";
  connection.query(sql, (err, rows) => {
    if (err) {
      return res.json({
        status: "failed",
        msg: err,
      });
    }
    res.json({
      status: "success",
      msg: rows,
    });
  });
});

const PORT = process.env.PORT || "5000";

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
```

### Step 3: Dockerize the backend

To dockerize the backend, we need to create a Dockerfile in our web folder.
It's content like below:

```Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm" ,"start"]
```

- We use node:16 as a base image (alpine because it is very small in size).
- Then we create a working directory `/app` inside the container.
- Then copy `package.json` to the `/app` folder.
- Run `npm install` to install dependencies (express and mysql).
- **Copy the remaining files** (make sure to create .dockerignore file and add node_modules to ignore node_modues being copied).
- Expose port 5000, so that we can access the app outside the container.
- Finally run `npm start` to start the backend (make sure to add npm start script in package.json).

## Dockerizing MYSQL

### Step 1: Create db folder in the root directory and cd into it, and then create files named testdump.sql, Dockerfile

We have already created the nodejs backend and the Dockerfile.
Now lets create MYSQL docker image.
First **go to the root folder** and in the root folder create a new file named `db` and cd into it.

```sh
cd .. & mkdir db & cd db
touch testdump.sql
touch Dockerfile
```

### Step 2: Edit the file Dockerfile in the db folder

- the Dockerfile file should contain contents below:

```Dockerfile
FROM mysql:5.7
EXPOSE 3306
COPY ./testdump.sql /docker-entrypoint-initdb.d/
```

We used mysql version 5.7 as root image, exposed the default port 3306 and copied the file testdump.sql to docer-entrypoint-initdb.d (all the sql script inside this folder will execute when the container start)

## Create docker-compose file

### Step 1: Create the file docker-compose.yml

Now we set up the nodejs backend and MySQL Database, and then we need to create a file named `docker-compose.yml` in the root folder.

### Step 2: Edit the file `docker-compose.yml`

```Dockerfile
version: '3.8'
services:
  db:
    build: ./db
    environment:
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: icoding
    restart: always
  web:
    build: ./web
    environment:
      MYSQL_DATABASE: icoding
      MYSQL_USER: root
      MYSQL_PASSWORD: 123456
      MYSQL_HOST: db
    ports:
      - "5000:5000"
    depends_on:
      - db
    restart: on-failure
```

We created 2 services:

- **db** (MYSQL service)
- **web** (Nodejs backend service)

Also we specified build folder for both the services, added the environment variable to make sure that our nodejs can connect to mysql

Finally **depends_on: db** will make sure that **db** container starts before **web** container.

## Run the app

Now we have already all the coding, and we just do run the app using the following command.

```sh
docker-compose up
```

This will first create **docker images** and the run the both the containers.
To view the application go to http://localhost:5000
