const express = require("express");
const controller = require("../controllers/fire.controller");

const router = express.Router();

router.post("/", controller.calculate);

module.exports = router;
