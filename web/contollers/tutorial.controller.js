const Tutorial = require("../models/tutorial.model");

const create = async (req, res, next) => {
  const result = await new Tutorial(req.body).create();
  res.send(result);
};

module.exports = {
  create,
};
