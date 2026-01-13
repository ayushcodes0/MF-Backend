function calculateFIRE(input) {
  const {
    monthlyExpenseToday,
    inflationRate,
    safeWithdrawalRate,
    expectedReturn,
    yearsToFire
  } = input;

  const inflation = inflationRate / 100;
  const returnRate = expectedReturn / 100;
  const swr = safeWithdrawalRate / 100;

  // 1️⃣ Expense at FIRE year
  const expenseAtFire =
    monthlyExpenseToday *
    Math.pow(1 + inflation, yearsToFire);

  const annualExpenseAtFire = expenseAtFire * 12;

  // 2️⃣ FIRE corpus
  const fireCorpus =
    annualExpenseAtFire / swr;

  // 3️⃣ Monthly SIP required
  const monthlyRate = returnRate / 12;
  const months = yearsToFire * 12;

  const sipRequired =
    fireCorpus /
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate));

  return {
    expenseAtFire: Math.round(expenseAtFire),
    fireCorpus: Math.round(fireCorpus),
    monthlySipRequired: Math.round(sipRequired)
  };
}

module.exports = {
  calculateFIRE
};
