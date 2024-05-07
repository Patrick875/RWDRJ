const express = require("express");
const aboutusPageController = require("../controllers/aboutusPageController");
const { aboutUsPageImageUploader } = require("../utils/imageUploader");

const router = express.Router();
// siteInfoController.create
router
	.route("/")
	.get(aboutusPageController.get)
	.post(aboutUsPageImageUploader, aboutusPageController.create);
router.patch("/:id", aboutUsPageImageUploader, aboutusPageController.update);

module.exports = router;
