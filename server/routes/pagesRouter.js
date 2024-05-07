const express = require("express");
const pagesController = require("./../controllers/pagesController.js");

const router = express.Router();

router.route("/").get(pagesController.get);

module.exports = router;
