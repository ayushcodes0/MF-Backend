const AdvisorService = require("../services/advisor.service");

exports.chat = (req, res, next) => {
  try {
    const reply = AdvisorService.generateAdvice(req.body);
    res.json(reply);
  } catch (err) {
    next(err);
  }
};

