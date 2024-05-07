const express = require("express");
const digitalInfoPageController = require("./../controllers/digitalInfoController");
const { contactUsPageImageUploader } = require("../utils/imageUploader");
const router = express.Router();

router
	.route("/")
	.get(digitalInfoPageController.get)
	.post(digitalInfoPageController.create);
router.patch("/:id", digitalInfoPageController.update);

module.exports = router;
