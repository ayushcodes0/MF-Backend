const {
  calculateFIRE
} = require("../services/calculator/fire.calculator");

exports.calculate = (req, res, next) => {
  try {
    const result = calculateFIRE(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
