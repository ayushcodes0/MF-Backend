const mongoose = require("mongoose");

const fundSchema = new mongoose.Schema(
  {
    schemeCode: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    fundName: {
      type: String,
      required: true,
      index: true
    },

    amc: {
      type: String,
      index: true
    },

    category: {
      type: String,
      enum: ["EQUITY", "DEBT", "HYBRID", "INDEX", "ELSS", "OTHER"],
      index: true
    },

    subCategory: {
      type: String
    },

    riskLevel: {
      type: String,
      enum: ["LOW", "MODERATE", "HIGH"],
      index: true
    },

    nav: {
      type: Number
    },

    navDate: {
      type: Date
    },

    expenseRatio: {
      type: Number
    },

    aum: {
      type: Number
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Fund", fundSchema);
