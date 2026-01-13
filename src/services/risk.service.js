function assessRisk(input) {
  let score = 0;

  const {
    age,
    investmentHorizon, // years
    incomeStability,   // "LOW" | "MEDIUM" | "HIGH"
    marketReaction,    // "SELL" | "HOLD" | "BUY"
    goal               // "WEALTH" | "RETIREMENT" | "SAFETY"
  } = input;

  // 🧓 Age factor
  if (age < 30) score += 20;
  else if (age < 45) score += 15;
  else if (age < 60) score += 8;
  else score += 4;

  // ⏳ Horizon factor
  if (investmentHorizon >= 10) score += 20;
  else if (investmentHorizon >= 5) score += 15;
  else score += 8;

  // 💰 Income stability
  if (incomeStability === "HIGH") score += 20;
  else if (incomeStability === "MEDIUM") score += 12;
  else score += 6;

  // 📉 Market behaviour
  if (marketReaction === "BUY") score += 20;
  else if (marketReaction === "HOLD") score += 12;
  else score += 5;

  // 🎯 Goal adjustment
  if (goal === "WEALTH") score += 10;
  else if (goal === "RETIREMENT") score += 6;
  else score += 2;

  // 🧮 Normalize
  score = Math.min(score, 100);

  let riskLevel = "MODERATE";
  if (score >= 70) riskLevel = "HIGH";
  else if (score <= 35) riskLevel = "LOW";

  return {
    riskScore: score,
    riskLevel
  };
}

module.exports = {
  assessRisk
};
