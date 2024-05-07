const mongoose = require("mongoose");
const sectionSchema = require("./sectionModel");
const contentSchema = require("./contentSchema");

const advocacyPageSchema = mongoose.Schema(
	{
		name: String,
		title: String,
		subtitle: String,
		coverImage: String,
		content: [contentSchema],
		sections: [sectionSchema],
		videosection: {
			url: String,
			bg: String,
		},
	},
	{
		timestamps: { createdAt: true, updatedAt: false },
	}
);

const AdvocacyPage = mongoose.model("AdvocacyPage", advocacyPageSchema);

module.exports = AdvocacyPage;
