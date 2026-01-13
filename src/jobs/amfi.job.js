const cron = require("node-cron");
const { syncSchemeMaster } = require("../services/amfi/amfi.scheme.sync");
const { syncNAVFromMFAPI } = require("../services/mfapi/mfapi.nav.sync");

cron.schedule("0 18 * * 1-5", async () => {
  try {
    console.log("⏰ Daily MF sync started");

    await syncSchemeMaster();
    await syncNAVFromMFAPI();

    console.log("🎉 Daily MF sync finished");
  } catch (err) {
    console.error("❌ Daily MF sync failed", err.message);
  }
});
