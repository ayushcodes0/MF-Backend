const RankingService = require("../services/analytics/ranking.service");

exports.topPerforming = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const data = await RankingService.getTopPerformingFunds(limit);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.topRankingByCategory = async (req, res, next) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res
        .status(400)
        .json({ message: "category is required" });
    }

    const limit = Number(req.query.limit) || 5;
    const data =
      await RankingService.getTopRankingByCategory(
        category,
        limit
      );

    res.json(data);
  } catch (err) {
    next(err);
  }
};
