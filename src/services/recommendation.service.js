const Fund = require("../models/fund.model");

const ALLOCATION_MAP = {
  LOW: { EQUITY: 20, DEBT: 70, HYBRID: 10 },
  MODERATE: { EQUITY: 50, DEBT: 30, HYBRID: 20 },
  HIGH: { EQUITY: 75, DEBT: 15, HYBRID: 10 }
};

async function getFundsByCategory(category, limit = 5) {
  return Fund.find({
    category,
    nav: { $exists: true }
  })
    .sort({ nav: -1 })
    .limit(limit)
    .lean();
}

async function generate(input) {
  const { riskLevel } = input;

  if (!ALLOCATION_MAP[riskLevel]) {
    throw new Error("Invalid risk level");
  }

  const allocation = ALLOCATION_MAP[riskLevel];

  const [equity, debt, hybrid] = await Promise.all([
    allocation.EQUITY
      ? getFundsByCategory("EQUITY", 5)
      : [],
    allocation.DEBT
      ? getFundsByCategory("DEBT", 5)
      : [],
    allocation.HYBRID
      ? getFundsByCategory("HYBRID", 5)
      : []
  ]);

  return {
    riskLevel,
    allocation,
    recommendations: {
      equity,
      debt,
      hybrid
    }
  };
}

module.exports = {
  generate
};
