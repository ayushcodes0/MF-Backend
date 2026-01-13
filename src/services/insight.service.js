const Fund = require("../models/fund.model");

async function getAll() {
  const totalFunds = await Fund.countDocuments({ isActive: true });

  const byCategory = await Fund.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 }
      }
    }
  ]);

  const byRisk = await Fund.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: "$riskLevel",
        count: { $sum: 1 }
      }
    }
  ]);

  const navAvailable = await Fund.countDocuments({
    nav: { $exists: true }
  });

  const insights = [];

  // 📊 Category insight
  const topCategory = byCategory.sort(
    (a, b) => b.count - a.count
  )[0];

  if (topCategory) {
    insights.push({
      type: "CATEGORY_DOMINANCE",
      message: `${topCategory._id} funds dominate the market with ${topCategory.count} active schemes.`,
      confidence: "HIGH"
    });
  }

  // ⚠️ Risk insight
  const highRisk = byRisk.find((r) => r._id === "HIGH");
  if (highRisk && highRisk.count / totalFunds > 0.5) {
    insights.push({
      type: "RISK_TREND",
      message:
        "High-risk funds form a major portion of available schemes. Suitable for long-term investors.",
      confidence: "MEDIUM"
    });
  }

  // 📈 NAV freshness insight
  const navCoverage = Math.round(
    (navAvailable / totalFunds) * 100
  );

  insights.push({
    type: "DATA_COVERAGE",
    message: `NAV data is available for ${navCoverage}% of active funds.`,
    confidence: "HIGH"
  });

  return insights;
}

module.exports = {
  getAll
};
