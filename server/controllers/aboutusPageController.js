const AboutUsPage = require("../models/aboutusPage");
const { Partner } = require("../models/partnersModel");
const asyncHandler = require("../utils/asyncHandler");

exports.get = asyncHandler(async (req, res) => {
	const aboutusPage = await AboutUsPage.find();
	const partners = await Partner.find();
	res.status(200).json({
		status: "success",
		partners,
		data: aboutusPage,
	});
});

exports.create = asyncHandler(async (req, res) => {
	const {
		name,
		twitterProfile,
		statisticSection,
		whatWeDoSection,
		whoWeAreSection,
		herosection,
	} = req.body;
	const aboutusPage = await AboutUsPage.create({
		name,
		twitterProfile,
		statisticSection,
		whatWeDoSection,
		whoWeAreSection,
		herosection,
	});
	res.status(201).json({
		status: "success",
		message: "page created successfully",
		data: aboutusPage,
	});
});

exports.update = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const {
		name,
		twitterProfile,
		statisticSection,
		whatWeDoSection,
		whoWeAreSection,
		herosection,
	} = req.body;

	await AboutUsPage.findByIdAndUpdate(id, {
		name,
		twitterProfile,
		statisticSection,
		whatWeDoSection,
		whoWeAreSection,
		herosection,
	});

	const newPage = await AboutUsPage.findById(id);
	res.status(200).json({
		status: "success",
		message: "Your page has been updated",
		data: newPage,
	});
});
