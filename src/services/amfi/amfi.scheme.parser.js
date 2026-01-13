const CATEGORY_MAP = {
  "Equity Scheme": "EQUITY",
  "Debt Scheme": "DEBT",
  "Hybrid Scheme": "HYBRID",
  "Index Funds": "INDEX",
  "ELSS": "ELSS"
};

function mapRiskLevel(category) {
  if (category === "EQUITY" || category === "ELSS") return "HIGH";
  if (category === "DEBT") return "LOW";
  return "MODERATE";
}

function parseAMFISchemeMaster(text) {
  const lines = text.split("\n");
  const schemes = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(";");
    if (parts.length < 4) continue;

    const schemeCode = parts[0]?.trim();
    const schemeName = parts[3]?.trim();
    const amc = parts[1]?.trim();
    const schemeType = parts[4]?.trim();
    const schemeCategory = parts[5]?.trim();

    const category =
      CATEGORY_MAP[schemeType] || "OTHER";

    schemes.push({
      schemeCode,
      fundName: schemeName,
      amc,
      category,
      subCategory: schemeCategory,
      riskLevel: mapRiskLevel(category),
      isActive: true
    });
  }

  return schemes;
}

module.exports = {
  parseAMFISchemeMaster
};
