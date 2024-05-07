const express = require("express");
const trainingPageController = require("./../controllers/trainingPageController");
const { contactUsPageImageUploader } = require("../utils/imageUploader");
const router = express.Router();

router
	.route("/")
	.get(trainingPageController.get)
	.post(trainingPageController.create);
router.patch("/:id", trainingPageController.update);

module.exports = router;
