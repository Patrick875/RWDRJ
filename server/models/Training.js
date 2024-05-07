const mongoose = require("mongoose");
const sectionSchema = require("./sectionModel");
const contentSchema = require("./contentSchema");

const trainingPageSchema = mongoose.Schema(
	{
		name: String,
		title: String,
		subtitle: String,
		coverImage: String,
		sections: [sectionSchema],
	},
	{
		timestamps: { createdAt: true, updatedAt: false },
	}
);

const TrainingPage = mongoose.model("TrainingPage", trainingPageSchema);

module.exports = TrainingPage;
