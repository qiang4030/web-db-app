const Tutorial = require("../models/tutorial.model");

const create = async (req, res) => {
  const result = await new Tutorial(req.body).create();
  res.send(result);
};

const findAll = async (req, res) => {
  const result = await new Tutorial().findAll();
  res.send(result);
};

module.exports = {
  create,
  findAll,
};
