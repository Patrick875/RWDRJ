const TrainingPage = require("../models/Training");
const asyncHandler = require("../utils/asyncHandler");

exports.get = asyncHandler(async (req, res) => {
	const trainingPage = await TrainingPage.find();
	res.status(200).json({
		status: "success",
		data: trainingPage,
	});
});

exports.create = asyncHandler(async (req, res) => {
	const { title, subtitle, coverImage, content, sections } = req.body;
	const trainingPage = await TrainingPage.create({
		title,
		subtitle,
		coverImage,
		content,
		sections,
	});
	res.status(201).json({
		status: "success",
		message: "Page created successfully",
		data: trainingPage,
	});
});

exports.update = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name, title, subtitle, coverImage, content, sections } = req.body;

	await TrainingPage.findByIdAndUpdate(id, {
		name,
		title,
		subtitle,
		coverImage,
		content,
		sections,
	});

	const newPage = await TrainingPage.findById(id);
	res.status(200).json({
		status: "success",
		message: "Page updated successfully",
		data: newPage,
	});
});
