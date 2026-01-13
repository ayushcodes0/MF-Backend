const app = require("./app");
const { PORT } = require("./config/env.config");
const connectDB = require("./config/db.config");

connectDB();
require("./jobs/amfi.job");


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
