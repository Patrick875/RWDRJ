const CompaignPage = require("../models/compaignAndOrganizing");
const asyncHandler = require("../utils/asyncHandler");

exports.get = asyncHandler(async (req, res) => {
	const compaignPage = await CompaignPage.find();
	res.status(200).json({
		status: "success",
		data: compaignPage,
	});
});

exports.create = asyncHandler(async (req, res) => {
	const { title, subtitle, coverImage, content, sections } = req.body;
	const compaignPage = await CompaignPage.create({
		title,
		subtitle,
		coverImage,
		content,
		sections,
	});
	res.status(201).json({
		status: "success",
		message: "Page created successfully",
		data: compaignPage,
	});
});

exports.update = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name, title, subtitle, coverImage, content, sections } = req.body;

	await CompaignPage.findByIdAndUpdate(id, {
		name,
		title,
		subtitle,
		coverImage,
		content,
		sections,
	});

	const newPage = await CompaignPage.findById(id);
	res.status(200).json({
		status: "success",
		message: "Page updated successfully",
		data: newPage,
	});
});
