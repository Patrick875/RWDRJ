const mongoose = require("mongoose");
const contentSchema = require("./contentSchema");
const sectionSchema = require("./sectionModel");

const digitalInfoSchema = mongoose.Schema(
	{
		name: String,
		titles: {
			type: [String],
			maxlength: 2,
		},
		content: String,
		subtitles: { type: [String], maxlength: 2 },
		coverImages: {
			type: [String],
			maxlength: 2,
		},
		section: sectionSchema,
	},
	{
		timestamps: { createdAt: true, updatedAt: true },
	}
);

const DigitalInfoPage = new mongoose.model(
	"DigitalInfoPage",
	digitalInfoSchema
);

module.exports = DigitalInfoPage;
