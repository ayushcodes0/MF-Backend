const Fund = require("../../models/fund.model");
const NavHistory = require("../../models/navHistory.model");
const axios = require("axios");

const MFAPI_BASE = "https://api.mfapi.in/mf";

/**
 * Sync full NAV history for all funds (one-time / occasional job)
 */
async function syncNavHistory() {
  console.log("📊 Starting NAV history sync...");

  const funds = await Fund.find(
    { schemeCode: { $exists: true } },
    { schemeCode: 1 }
  ).lean();

  let totalInserted = 0;

  for (const fund of funds) {
    try {
      const url = `${MFAPI_BASE}/${fund.schemeCode}`;
      const response = await axios.get(url, { timeout: 30000 });

      const navData = response.data?.data;
      if (!Array.isArray(navData)) continue;

      const bulkOps = navData.map((item) => ({
        updateOne: {
          filter: {
            schemeCode: fund.schemeCode,
            date: new Date(item.date)
          },
          update: {
            $setOnInsert: {
              schemeCode: fund.schemeCode,
              date: new Date(item.date),
              nav: Number(item.nav)
            }
          },
          upsert: true
        }
      }));

      if (bulkOps.length) {
        const result = await NavHistory.bulkWrite(bulkOps, {
          ordered: false
        });
        totalInserted += result.upsertedCount || 0;
      }
    } catch (err) {
      console.warn(
        `⚠️ NAV history failed for scheme ${fund.schemeCode}`
      );
    }
  }

  console.log(
    `✅ NAV history sync completed (${totalInserted} new records)`
  );
}

module.exports = {
  syncNavHistory
};
