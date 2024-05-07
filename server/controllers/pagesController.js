const TrainingPage = require("../models/Training");
const AboutUsPage = require("../models/aboutusPage");
const AdvocacyPage = require("../models/advocacyPage");
const CompaignPage = require("../models/compaignAndOrganizing");
const ContactUs = require("../models/contactus");
const DigitalInfoPage = require("../models/digitalInfoPage");
const OurTeamPage = require("../models/ourteamPage");
const asyncHandler = require("../utils/asyncHandler");

exports.get = asyncHandler(async (req, res) => {
	const advocacyPage = await AdvocacyPage.find();
	const aboutusPage = await AboutUsPage.find();
	const trainingPage = await TrainingPage.find();
	const ourTeamPage = await OurTeamPage.find();
	const compaignPage = await CompaignPage.find();
	const digitalInfoPage = await DigitalInfoPage.find();
	const contactusPage = await ContactUs.find();

	const pages = [
		advocacyPage[0],
		digitalInfoPage[0],
		contactusPage[0],
		compaignPage[0],
		digitalInfoPage[0],
		aboutusPage[0],
		trainingPage[0],
		ourTeamPage[0],
	];
	res.status(200).json({
		status: "success",
		data: pages,
	});
});

// exports.create = asyncHandler(async (req, res) => {
// 	const { title, subtitle, coverImage, content, sections } = req.body;
// 	const advocacyPage = await AdvocacyPage.create({
// 		title,
// 		subtitle,
// 		coverImage,
// 		content,
// 		sections,
// 	});
// 	res.status(201).json({
// 		status: "success",
// 		message: "Page created successfully",
// 		data: advocacyPage,
// 	});
// });

// exports.update = asyncHandler(async (req, res) => {
// 	const { id } = req.params;
// 	const { title, subtitle, coverImage, content, sections } = req.body;

// 	await AdvocacyPage.findByIdAndUpdate(id, {
// 		title,
// 		subtitle,
// 		coverImage,
// 		content,
// 		sections,
// 	});

// 	const newPage = await AdvocacyPage.findById(id);
// 	res.status(200).json({
// 		status: "success",
// 		message: "Page updated successfully",
// 		data: newPage,
// 	});
// });
