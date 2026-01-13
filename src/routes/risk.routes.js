const express = require("express");
const RiskController = require("../controllers/risk.controller");

const router = express.Router();

router.post("/assess", RiskController.assessRisk);

module.exports = router;
