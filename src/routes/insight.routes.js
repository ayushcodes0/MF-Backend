const express = require("express");
const InsightController = require("../controllers/insight.controller");

const router = express.Router();

router.get("/", InsightController.getAll);

module.exports = router;
