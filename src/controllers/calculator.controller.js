const {
  calculateSIP,
  calculateLumpsum,
  calculateGoalSIP,
  calculateSWP
} = require("../services/calculator.service");

exports.sipCalculator = (req, res) => {
  const { monthlyInvestment, annualReturn, years } = req.body;

  const result = calculateSIP(
    Number(monthlyInvestment),
    Number(annualReturn),
    Number(years)
  );

  res.json({ futureValue: result });
};

exports.lumpsumCalculator = (req, res) => {
  const { amount, annualReturn, years } = req.body;

  const result = calculateLumpsum(
    Number(amount),
    Number(annualReturn),
    Number(years)
  );

  res.json({ futureValue: result });
};

exports.goalSipCalculator = (req, res) => {
  const { targetAmount, annualReturn, years } = req.body;

  const sip = calculateGoalSIP(
    Number(targetAmount),
    Number(annualReturn),
    Number(years)
  );

  res.json({ requiredMonthlySip: sip });
};

exports.swpCalculator = (req, res) => {
  const { initialAmount, annualReturn, monthlyWithdrawal, years } = req.body;

  const remainingAmount = calculateSWP(
    Number(initialAmount),
    Number(annualReturn),
    Number(monthlyWithdrawal),
    Number(years)
  );

  res.json({ remainingAmount });
};
