const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfig = require("./config/db.confg");

const connection = mysql.createPool(dbConfig);

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

app.post("/create", (req, res) => {
  const sql =
    "insert into tutorials (title,description,published) values (?,?,?)";
  const values = Object.values(req.body);
  connection.query(sql, values, (err, rows) => {
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
