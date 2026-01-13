const NFOService = require("../services/nfo.service");

exports.getAll = async (req, res, next) => {
  try {
    const data = NFOService.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
};
