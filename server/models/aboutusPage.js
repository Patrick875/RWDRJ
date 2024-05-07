const mongoose = require("mongoose");
const heroSectionSchema = require("./herosection");
const aboutUsWhatWeDoSchema = require("./AboutUsWhatWeDoSchema");
const aboutUsNumbersSchema = require("./aboutUsNumbersSchema");
const sectionSchema = require("./sectionModel");
const aboutUsPageSchema = mongoose.Schema(
	{
		name: String,
		herosection: heroSectionSchema,
		whoWeAreSection: sectionSchema,
		whatWeDoSection: aboutUsWhatWeDoSchema,
		statisticSection: aboutUsNumbersSchema,
		twitterProfile: String,
	},
	{
		timestamps: { createdAt: true, updatedAt: false },
	}
);

const AboutUsPage = new mongoose.model("AboutUsPage", aboutUsPageSchema);

module.exports = AboutUsPage;
