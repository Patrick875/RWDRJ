const DigitalInfoPage = require("../models/digitalInfoPage");
const asyncHandler = require("../utils/asyncHandler");

exports.get = asyncHandler(async (req, res) => {
	const digitalInfoPage = await DigitalInfoPage.find();
	res.status(200).json({
		status: "success",
		data: digitalInfoPage,
	});
});

exports.create = asyncHandler(async (req, res) => {
	const { titles, content, subtitles, coverImages, section } = req.body;
	const digitalInfoPage = await DigitalInfoPage.create({
		titles,
		content,
		subtitles,
		coverImages,
		section,
	});
	res.status(201).json({
		status: "success",
		message: "Page created successfully",
		data: digitalInfoPage,
	});
});

exports.update = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name, titles, content, subtitles, coverImages, section } = req.body;

	await DigitalInfoPage.findByIdAndUpdate(id, {
		name,
		titles,
		content,
		subtitles,
		coverImages,
		section,
	});

	const newPage = await DigitalInfoPage.findById(id);
	res.status(203).json({
		status: "success",
		message: "Page updated successfully",
		data: newPage,
	});
});
