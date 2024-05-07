const express = require("express");
const advocacyPageController = require("./../controllers/advocacyPageController");
const { contactUsPageImageUploader } = require("../utils/imageUploader");
const router = express.Router();

router
	.route("/")
	.get(advocacyPageController.get)
	.post(advocacyPageController.create);
router.patch("/:id", advocacyPageController.update);

module.exports = router;
