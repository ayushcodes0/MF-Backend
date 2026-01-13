const express = require("express");
const controller = require("../controllers/fundRanking.controller");

const router = express.Router();

router.get("/top-performing", controller.topPerforming);
router.get("/top-ranking", controller.topRankingByCategory);

module.exports = router;
