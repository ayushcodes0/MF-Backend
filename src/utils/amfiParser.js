function parseAMFI(text) {
  const lines = text.split("\n");
  const funds = [];

  for (const line of lines) {
    if (!line || line.startsWith("Scheme Code")) continue;

    const parts = line.split(";");
    if (parts.length < 4) continue;

    const [schemeCode, schemeName, nav, date] = parts;

    funds.push({
      schemeCode: schemeCode.trim(),
      fundName: schemeName.trim(),
      nav: Number(nav),
      lastUpdated: new Date(date.trim())
    });
  }

  return funds;
}

module.exports = { parseAMFI };
