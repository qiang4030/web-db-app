const express = require("express");
const router = express.Router();

const { create, findAll } = require("../contollers/tutorial.controller");

router.get("/", findAll);
router.post("/create", create);

module.exports = router;
