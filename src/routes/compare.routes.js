const express = require("express");
const controller = require("../controllers/compare.controller");

const router = express.Router();

router.post("/", controller.compareFunds);

module.exports = router;
