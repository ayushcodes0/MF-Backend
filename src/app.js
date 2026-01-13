const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const routes = require("./routes/index.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();


app.use(cors());
app.use(express.json());


app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);


app.use("/api", routes);


app.use(errorMiddleware);

module.exports = app;
