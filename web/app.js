const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const execSQL = require("./models/db.model");

app.get("/", async (req, res) => {
  const sql = "select * from tutorials";
  try {
    const rows = await execSQL(sql);
    res.json({
      status: "success",
      msg: rows,
    });
  } catch (err) {
    res.json({
      status: "failed",
      msg: err,
    });
  }
});

app.post("/create", async (req, res) => {
  const sql =
    "insert into tutorials (title,description,published) values (?,?,?)";
  const values = Object.values(req.body);
  try {
    const rows = await execSQL(sql, values);
    if (rows.affectedRows === 1) {
      return res.json({
        status: "success",
        msg: "添加成功",
      });
    }
    res.json({
      status: "failed",
      msg: row,
    });
  } catch (err) {
    res.json({
      status: "failed",
      msg: err,
    });
  }
});

app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      status: "failed",
      msg: err.message,
    });
  }
});

const PORT = process.env.PORT || "3000";

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
