const OurTeamPage = require("../models/ourteamPage");
const asyncHandler = require("../utils/asyncHandler");

exports.get = asyncHandler(async (req, res) => {
	const ourTeam = await OurTeamPage.find();
	res.status(200).json({
		status: "success",
		data: ourTeam,
	});
});

exports.create = asyncHandler(async (req, res) => {
	const { name, title, subtitle, coverImage } = req.body;
	const ourTeam = await OurTeamPage.create({
		name,
		title,
		subtitle,
		coverImage,
	});
	res.status(201).json({
		status: "success",
		message: "Page created successfully",
		data: ourTeam,
	});
});

exports.update = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { name, title, subtitle, coverImage } = req.body;

	await OurTeamPage.findByIdAndUpdate(id, {
		name,
		title,
		subtitle,
		coverImage,
	});

	const newPage = await OurTeamPage.findById(id);
	res.status(200).json({
		status: "success",
		message: "Page updated successfully",
		data: newPage,
	});
});
