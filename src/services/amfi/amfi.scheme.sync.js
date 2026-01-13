const Fund = require("../../models/fund.model");
const { fetchAMFISchemeMaster } = require("./amfi.scheme.fetcher");
const { parseAMFISchemeMaster } = require("./amfi.scheme.parser");

async function syncSchemeMaster() {
  console.log("📥 Syncing AMFI Scheme Master...");

  const rawData = await fetchAMFISchemeMaster();
  const schemes = parseAMFISchemeMaster(rawData);

  const bulkOps = schemes.map((scheme) => ({
    updateOne: {
      filter: { schemeCode: scheme.schemeCode },
      update: { $set: scheme },
      upsert: true
    }
  }));

  if (bulkOps.length) {
    await Fund.bulkWrite(bulkOps);
  }

  console.log(`✅ Scheme Master synced (${schemes.length} schemes)`);
}

module.exports = {
  syncSchemeMaster
};
