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

const tutorialRouter = require("./routes/tutorial.route");

app.use("/tutorial", tutorialRouter);

const PORT = process.env.PORT || "3000";

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
