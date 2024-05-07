const AdvocacyPage = require("../models/advocacyPage");
const asyncHandler = require("../utils/asyncHandler");

exports.get = asyncHandler(async (req, res) => {
	const advocacyPage = await AdvocacyPage.find();
	res.status(200).json({
		status: "success",
		data: advocacyPage,
	});
});

exports.create = asyncHandler(async (req, res) => {
	const { name, title, subtitle, coverImage, content, sections } = req.body;
	const advocacyPage = await AdvocacyPage.create({
		title,
		name,
		subtitle,
		coverImage,
		content,
		sections,
	});
	res.status(201).json({
		status: "success",
		message: "Page created successfully",
		data: advocacyPage,
	});
});

exports.update = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { title, subtitle, coverImage, content, sections } = req.body;

	await AdvocacyPage.findByIdAndUpdate(id, {
		title,
		subtitle,
		coverImage,
		content,
		sections,
	});

	const newPage = await AdvocacyPage.findById(id);
	res.status(203).json({
		status: "success",
		message: "Page updated successfully",
		data: newPage,
	});
});
