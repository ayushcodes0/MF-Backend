function calculateAffordability(input) {
  const {
    monthlyIncome,
    existingMonthlyEMIs,
    maxEmiRatio,
    interestRate,
    tenureYears
  } = input;

  const maxAllowedEMI =
    (monthlyIncome * maxEmiRatio) / 100;

  const availableEMI =
    maxAllowedEMI - existingMonthlyEMIs;

  if (availableEMI <= 0) {
    return {
      eligible: false,
      message: "No EMI capacity available"
    };
  }

  const monthlyRate = interestRate / 12 / 100;
  const months = tenureYears * 12;

  // Reverse EMI formula → Loan amount
  const loanAmount =
    (availableEMI *
      (Math.pow(1 + monthlyRate, months) - 1)) /
    (monthlyRate * Math.pow(1 + monthlyRate, months));

  const totalPayment = availableEMI * months;
  const totalInterest = totalPayment - loanAmount;

  return {
    eligible: true,
    maxAffordableEMI: Math.round(availableEMI),
    loanAmount: Math.round(loanAmount),
    totalInterest: Math.round(totalInterest)
  };
}

module.exports = {
  calculateAffordability
};
