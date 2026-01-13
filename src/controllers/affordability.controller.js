const {
  calculateAffordability
} = require("../services/calculator/affordibility.calculator");

exports.calculate = (req, res, next) => {
  try {
    const result = calculateAffordability(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
