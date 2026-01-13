const express = require("express");
const FundController = require("../controllers/fund.controller");

const router = express.Router();

router.get("/", FundController.getAllFunds);
router.get("/:id", FundController.getFundById);

module.exports = router;
