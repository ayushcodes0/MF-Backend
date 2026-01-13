const NFO = require("../models/nfo.model");

async function getAll() {
  const today = new Date();

  return NFO.find({
    isActive: true,
    closeDate: { $gte: today }
  })
    .sort({ openDate: -1 })
    .lean();
}

module.exports = {
  getAll
};
