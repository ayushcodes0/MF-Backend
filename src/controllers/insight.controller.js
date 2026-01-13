const InsightService = require("../services/insight.service");

exports.getAll = async (req, res, next) => {
  try {
    const insights = InsightService.getAll();
    res.json(insights);
  } catch (err) {
    next(err);
  }
};
