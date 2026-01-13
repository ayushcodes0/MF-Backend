const Fund = require("../models/fund.model");

async function getFunds(filters) {
  const query = { isActive: true };

  // 🔍 Search
  if (filters.search) {
    query.fundName = {
      $regex: filters.search,
      $options: "i"
    };
  }

  // 🎯 Category filter
  if (filters.category) {
    query.category = filters.category;
  }

  // ⚠️ Risk filter
  if (filters.riskLevel) {
    query.riskLevel = filters.riskLevel;
  }

  // 📄 Pagination
  const page = Math.max(Number(filters.page) || 1, 1);
  const limit = Math.min(Number(filters.limit) || 20, 50);
  const skip = (page - 1) * limit;

  // ⬆️⬇️ Sorting
  const sort = {};
  if (filters.sortBy === "nav") {
    sort.nav = filters.order === "asc" ? 1 : -1;
  } else if (filters.sortBy === "name") {
    sort.fundName = 1;
  } else {
    sort.createdAt = -1;
  }

  const [funds, total] = await Promise.all([
    Fund.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    Fund.countDocuments(query)
  ]);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    funds
  };
}

async function getFundById(id) {
  return Fund.findById(id).lean();
}

module.exports = {
  getFunds,
  getFundById
};
