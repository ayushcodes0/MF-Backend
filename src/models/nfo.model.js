const mongoose = require("mongoose");

const nfoSchema = new mongoose.Schema(
  {
    fundName: {
      type: String,
      required: true,
      index: true
    },

    amc: {
      type: String,
      required: true,
      index: true
    },

    category: {
      type: String,
      enum: ["EQUITY", "DEBT", "HYBRID", "INDEX", "ELSS", "OTHER"],
      required: true
    },

    riskLevel: {
      type: String,
      enum: ["LOW", "MODERATE", "HIGH"],
      required: true
    },

    openDate: {
      type: Date,
      required: true
    },

    closeDate: {
      type: Date,
      required: true
    },

    schemeType: {
      type: String
    },

    sourceUrl: {
      type: String
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("NFO", nfoSchema);
