const mongoose = require("mongoose");
const { syncNavHistory } = require("../services/analytics/nav.history.sync");
const { MONGODB_URI } = require("../config/env.config");

async function run() {
  await mongoose.connect(MONGODB_URI);
  await syncNavHistory();
  process.exit();
}

run();
