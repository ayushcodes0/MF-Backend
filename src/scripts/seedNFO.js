const mongoose = require("mongoose");
const NFO = require("../models/nfo.model");
const { MONGODB_URI } = require("../config/env.config");

async function seedNFOs() {
  await mongoose.connect(MONGODB_URI);

  await NFO.deleteMany({});

  await NFO.insertMany([
    {
      fundName: "HDFC Manufacturing Fund",
      amc: "HDFC Mutual Fund",
      category: "EQUITY",
      riskLevel: "HIGH",
      openDate: new Date("2024-12-01"),
      closeDate: new Date("2024-12-15"),
      schemeType: "Sectoral/Thematic",
      sourceUrl: "https://www.hdfcfund.com"
    },
    {
      fundName: "SBI Long Duration Debt Fund",
      amc: "SBI Mutual Fund",
      category: "DEBT",
      riskLevel: "LOW",
      openDate: new Date("2024-12-05"),
      closeDate: new Date("2024-12-20"),
      schemeType: "Debt",
      sourceUrl: "https://www.sbimf.com"
    }
  ]);

  console.log("✅ NFO seed completed");
  process.exit();
}

seedNFOs();
