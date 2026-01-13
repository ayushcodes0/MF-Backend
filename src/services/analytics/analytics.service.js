const NavHistory = require("../../models/navHistory.model");
const { calculateCAGR } = require("./cagr.calculator");

async function getNAVAtOrBefore(schemeCode, targetDate) {
  return NavHistory.findOne({
    schemeCode,
    date: { $lte: targetDate }
  })
    .sort({ date: -1 })
    .lean();
}

async function getFundCAGR(schemeCode) {
  const today = new Date();

  const periods = [
    { label: "1Y", years: 1 },
    { label: "3Y", years: 3 },
    { label: "5Y", years: 5 }
  ];

  const results = {};

  const latest = await getNAVAtOrBefore(schemeCode, today);
  if (!latest) return null;

  for (const period of periods) {
    const pastDate = new Date();
    pastDate.setFullYear(today.getFullYear() - period.years);

    const pastNAV = await getNAVAtOrBefore(
      schemeCode,
      pastDate
    );

    if (!pastNAV) {
      results[period.label] = null;
      continue;
    }

    results[period.label] = calculateCAGR(
      pastNAV.nav,
      latest.nav,
      period.years
    );
  }

  return results;
}

module.exports = {
  getFundCAGR
};
