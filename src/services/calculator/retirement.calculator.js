function calculateRetirement(input) {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    monthlyExpenseToday,
    inflationRate,
    preRetirementReturn,
    postRetirementReturn
  } = input;

  const yearsToRetire = retirementAge - currentAge;
  const yearsAfterRetirement = lifeExpectancy - retirementAge;

  const inflation = inflationRate / 100;
  const preReturn = preRetirementReturn / 100;
  const postReturn = postRetirementReturn / 100;

  // 1️⃣ Monthly expense at retirement
  const expenseAtRetirement =
    monthlyExpenseToday *
    Math.pow(1 + inflation, yearsToRetire);

  // 2️⃣ Retirement corpus (annuity formula)
  const annualExpenseAtRetirement =
    expenseAtRetirement * 12;

  const corpusRequired =
    annualExpenseAtRetirement *
    ((1 - Math.pow(1 + postReturn, -yearsAfterRetirement)) /
      postReturn);

  // 3️⃣ Monthly SIP required
  const monthlyRate = preReturn / 12;
  const months = yearsToRetire * 12;

  const sipRequired =
    corpusRequired /
    (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate));

  return {
    expenseAtRetirement: Math.round(expenseAtRetirement),
    corpusRequired: Math.round(corpusRequired),
    monthlySipRequired: Math.round(sipRequired)
  };
}

module.exports = {
  calculateRetirement
};
