const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tutorialRouter = require("./routes/tutorial.route");

app.use("/tutorial", tutorialRouter);

app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).send(err);
  }
});

const PORT = process.env.PORT || "3000";

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
