const mongoose = require("mongoose");
const sectionSchema = require("./sectionModel");
const contentSchema = require("./contentSchema");

const compaignPageSchema = mongoose.Schema(
	{
		name: String,
		title: String,
		subtitle: String,
		coverImage: String,
		content: [contentSchema],
		sections: [sectionSchema],
	},
	{
		timestamps: { createdAt: true, updatedAt: false },
	}
);

const CompaignPage = mongoose.model("CompaignPage", compaignPageSchema);

module.exports = CompaignPage;
