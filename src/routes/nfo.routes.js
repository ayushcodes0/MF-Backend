const express = require("express");
const NFOController = require("../controllers/nfo.controller");

const router = express.Router();

router.get("/", NFOController.getAll);

module.exports = router;
