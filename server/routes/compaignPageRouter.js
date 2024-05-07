const express = require("express");
const compaignPageController = require("./../controllers/compainPageController");
const { contactUsPageImageUploader } = require("../utils/imageUploader");
const router = express.Router();

router
	.route("/")
	.get(compaignPageController.get)
	.post(compaignPageController.create);
router.patch("/:id", compaignPageController.update);

module.exports = router;
