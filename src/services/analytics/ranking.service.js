const Fund = require("../../models/fund.model");
const { getFundCAGR } = require("./analytics.service");

/**
 * Get top funds across all categories
 */
async function getTopPerformingFunds(limit = 10) {
  const funds = await Fund.find(
    { nav: { $exists: true } },
    { schemeCode: 1, fundName: 1, category: 1 }
  ).lean();

  const results = [];

  for (const fund of funds) {
    const cagr = await getFundCAGR(fund.schemeCode);
    if (!cagr) continue;

    const score =
      cagr["3Y"] ?? cagr["1Y"];

    if (!score) continue;

    results.push({
      ...fund,
      cagr
    });
  }

  results.sort(
    (a, b) =>
      (b.cagr["3Y"] ?? b.cagr["1Y"]) -
      (a.cagr["3Y"] ?? a.cagr["1Y"])
  );

  return results.slice(0, limit);
}

/**
 * Get top funds per category
 */
async function getTopRankingByCategory(category, limit = 5) {
  const funds = await Fund.find(
    { category, nav: { $exists: true } },
    { schemeCode: 1, fundName: 1, category: 1 }
  ).lean();

  const ranked = [];

  for (const fund of funds) {
    const cagr = await getFundCAGR(fund.schemeCode);
    if (!cagr || !cagr["3Y"]) continue;

    ranked.push({
      ...fund,
      cagr
    });
  }

  ranked.sort((a, b) => b.cagr["3Y"] - a.cagr["3Y"]);

  return ranked.slice(0, limit);
}

module.exports = {
  getTopPerformingFunds,
  getTopRankingByCategory
};
