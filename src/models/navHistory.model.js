const mongoose = require("mongoose");

const navHistorySchema = new mongoose.Schema(
  {
    schemeCode: {
      type: String,
      required: true,
      index: true
    },

    date: {
      type: Date,
      required: true,
      index: true
    },

    nav: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: false
  }
);

navHistorySchema.index(
  { schemeCode: 1, date: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "NavHistory",
  navHistorySchema
);
