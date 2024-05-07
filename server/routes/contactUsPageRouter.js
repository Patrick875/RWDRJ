const express = require("express");
const contactusController = require("./../controllers/contactusController");
const { contactUsPageImageUploader } = require("../utils/imageUploader");
const router = express.Router();

router
	.route("/")
	.get(contactusController.get)
	.post(contactUsPageImageUploader, contactusController.create);
router.patch("/:id", contactusController.update);

module.exports = router;
