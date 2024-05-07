const mongoose = require("mongoose");

const socialMediaSchema = mongoose.Schema({
	name: {
		type: String,
		enum: ["facebook", "twitter", "instagram", "linkedin"],
	},
	link: String,
});

module.exports = socialMediaSchema;
