
const router = require("express").Router();
const controller = require("../controllers/calculator.controller");

router.post("/sip", controller.sipCalculator);
router.post("/lumpsum", controller.lumpsumCalculator);
router.post("/goal-sip", controller.goalSipCalculator);
router.post("/swp", controller.swpCalculator);

module.exports = router;

