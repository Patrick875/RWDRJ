const express = require("express");
const partnerController = require("./../controllers/partnerController");
const { partnerTeamMemberImageUploader } = require("../utils/imageUploader");
const router = express.Router();

router
	.route("/")
	.get(partnerController.get)
	.post(partnerTeamMemberImageUploader, partnerController.create);
router
	.route("/:id")
	.get(partnerController.getOne)
	.patch(partnerTeamMemberImageUploader, partnerController.update)
	.delete(partnerController.delete);

module.exports = router;
