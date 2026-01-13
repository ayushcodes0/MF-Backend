const RiskService = require("../services/risk.service");

exports.assessRisk = async (req, res, next) => {
  try {
    const result = RiskService.assessRisk(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

