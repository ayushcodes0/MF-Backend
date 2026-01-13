const Fund = require("../../models/fund.model");
const { fetchNAVBySchemeCode } = require("./mfapi.fetcher");

async function syncNAVFromMFAPI() {
  console.log("📥 Syncing NAVs from mfapi.in...");

  const funds = await Fund.find(
    { schemeCode: { $exists: true } },
    { schemeCode: 1 }
  ).lean();

  let updatedCount = 0;

  for (const fund of funds) {
    try {
      const data = await fetchNAVBySchemeCode(fund.schemeCode);

      if (!data || !data.data || data.data.length === 0) continue;

      const latestNAV = data.data[0];

      await Fund.updateOne(
        { schemeCode: fund.schemeCode },
        {
          $set: {
            nav: Number(latestNAV.nav),
            navDate: new Date(latestNAV.date)
          }
        }
      );

      updatedCount++;
    } catch (err) {
      // Skip broken schemes safely
      console.warn(
        `⚠️ NAV sync failed for scheme ${fund.schemeCode}`
      );
    }
  }

  console.log(`✅ NAV sync complete (${updatedCount} funds updated)`);
}

module.exports = {
  syncNAVFromMFAPI
};
