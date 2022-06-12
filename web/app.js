const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const { create } = require("./contollers/tutorial.controller");

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
