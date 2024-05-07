const express = require("express");
const ourTeamPageController = require("./../controllers/ourTeamPageController");
const { contactUsPageImageUploader } = require("../utils/imageUploader");
const router = express.Router();

router
	.route("/")
	.get(ourTeamPageController.get)
	.post(ourTeamPageController.create);
router.patch("/:id", ourTeamPageController.update);

module.exports = router;
