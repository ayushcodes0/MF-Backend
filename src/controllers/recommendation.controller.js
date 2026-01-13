const RecommendationService = require("../services/recommendation.service");

exports.generate = async (req, res, next) => {
  try {
    const data = await RecommendationService.generate(req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
