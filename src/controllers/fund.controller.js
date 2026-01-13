const FundService = require("../services/fund.service");

exports.getAllFunds = async (req, res, next) => {
  try {
    const data = await FundService.getFunds(req.query);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getFundById = async (req, res, next) => {
  try {
    const fund = await FundService.getFundById(req.params.id);

    if (!fund) {
      return res.status(404).json({
        success: false,
        message: "Fund not found"
      });
    }

    res.json(fund);
  } catch (err) {
    next(err);
  }
};
