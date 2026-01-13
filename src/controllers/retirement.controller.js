const {
  calculateRetirement
} = require("../services/calculator/retirement.calculator");

exports.calculate = (req, res, next) => {
  try {
    const result = calculateRetirement(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
