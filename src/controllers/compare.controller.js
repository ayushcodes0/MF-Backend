const Fund = require("../models/fund.model");
const { getFundCAGR } = require("../services/analytics/analytics.service");

exports.compareFunds = async (req, res, next) => {
  try {
    const { schemeCodes } = req.body;

    if (
      !Array.isArray(schemeCodes) ||
      schemeCodes.length < 2 ||
      schemeCodes.length > 4
    ) {
      return res.status(400).json({
        message: "Provide 2 to 4 schemeCodes for comparison"
      });
    }

    const funds = await Fund.find(
      { schemeCode: { $in: schemeCodes } },
      {
        schemeCode: 1,
        fundName: 1,
        category: 1,
        riskLevel: 1,
        nav: 1
      }
    ).lean();

    const result = [];

    for (const fund of funds) {
      const cagr = await getFundCAGR(fund.schemeCode);

      result.push({
        ...fund,
        cagr
      });
    }

    res.json({
      count: result.length,
      comparison: result
    });
  } catch (err) {
    next(err);
  }
};
