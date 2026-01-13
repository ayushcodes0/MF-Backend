const express = require("express");
const AdvisorController = require("../controllers/advisor.controller");

const router = express.Router();

router.post("/chat", AdvisorController.chat);

module.exports = router;
