const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { create, findAll } = require("./contollers/tutorial.controller");

app.get("/", findAll);

app.post("/create", create);

app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).send(err);
  }
});

const PORT = process.env.PORT || "3000";

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
