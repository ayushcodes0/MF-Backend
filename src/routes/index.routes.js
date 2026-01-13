const express = require("express");

const fundRoutes = require("./fund.routes");
const riskRoutes = require("./risk.routes");
const recommendationRoutes = require("./recommendation.routes");
const calculatorRoutes = require("./calculator.routes");
const advisorRoutes = require("./advisor.routes");
const insightRoutes = require("./insight.routes");
const nfoRoutes = require("./nfo.routes");
const fundRankingRoutes = require("./fundRanking.routes");
const compareRoutes = require("./compare.routes");
const retirementRoutes = require("./retirement.routes");
const fireRoutes = require("./fire.routes");
const affordabilityRoutes = require("./affordability.routes");


const router = express.Router();

router.use("/funds", fundRoutes);
router.use("/risk", riskRoutes);
router.use("/recommendations", recommendationRoutes);
router.use("/calculators", calculatorRoutes);
router.use("/advisor", advisorRoutes);
router.use("/insights", insightRoutes);
router.use("/nfo", nfoRoutes);
router.use("/funds", fundRankingRoutes);
router.use("/compare", compareRoutes);
router.use("/retirement", retirementRoutes);
router.use("/fire", fireRoutes);
router.use("/affordability", affordabilityRoutes);



router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = router;
