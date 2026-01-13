function calculateSIP(monthlyInvestment, annualRate, years) {
  const r = annualRate / 12 / 100;
  const n = years * 12;

  const futureValue =
    monthlyInvestment *
    ((Math.pow(1 + r, n) - 1) / r) *
    (1 + r);

  return Math.round(futureValue);
}

function calculateLumpsum(principal, annualRate, years) {
  const r = annualRate / 100;
  const futureValue = principal * Math.pow(1 + r, years);
  return Math.round(futureValue);
}

function calculateGoalSIP(targetAmount, annualRate, years) {
  const r = annualRate / 12 / 100;
  const n = years * 12;

  const sip =
    targetAmount /
    (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

  return Math.round(sip);
}

function calculateSWP(
  initialInvestment,
  annualRate,
  monthlyWithdrawal,
  years
) {
  let balance = initialInvestment;
  const r = annualRate / 12 / 100;
  const months = years * 12;

  for (let i = 0; i < months; i++) {
    balance = balance * (1 + r) - monthlyWithdrawal;
    if (balance <= 0) break;
  }

  return Math.round(balance);
}

module.exports = {
  calculateSIP,
  calculateLumpsum,
  calculateGoalSIP,
  calculateSWP
};
