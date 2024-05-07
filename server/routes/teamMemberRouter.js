const express = require("express");
const teamMemberController = require("./../controllers/teamMemberController");
const {
	contactUsPageImageUploader,
	partnerTeamMemberImageUploader,
} = require("../utils/imageUploader");
const router = express.Router();

router
	.route("/")
	.get(teamMemberController.get)
	.post(partnerTeamMemberImageUploader, teamMemberController.create);
router
	.route("/:id")
	.get(teamMemberController.getOne)
	.patch(partnerTeamMemberImageUploader, teamMemberController.update)
	.delete(teamMemberController.delete);

module.exports = router;
