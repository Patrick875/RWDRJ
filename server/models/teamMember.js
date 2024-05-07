const mongoose = require("mongoose");
const socialMediaSchema = require("./socialMediaSchema");

const teamMemberSchema = mongoose.Schema({
	names: {
		type: String,
		trim: true,
		unique: [true, "member already exists"],
	},
	title: String,
	image: String,
	positionOnPage: Number,
	hide: {
		type: Boolean,
		default: false,
	},
	visible: { type: Boolean, default: true },
	socialMedias: [socialMediaSchema],
});

const TeamMember = new mongoose.model("TeamMember", teamMemberSchema);

module.exports = TeamMember;
