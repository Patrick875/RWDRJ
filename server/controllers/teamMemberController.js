const TeamMember = require("../models/teamMember");
const asyncHandler = require("../utils/asyncHandler");

exports.get = asyncHandler(async (req, res) => {
	const teamMembers = await TeamMember.find({ hide: false });
	res.status(200).json({
		status: "success",
		data: teamMembers,
	});
});
exports.getOne = asyncHandler(async (req, res) => {
	const { id } = req.params;

	const teamMember = await TeamMember.findOne({ hide: false, _id: id });
	res.status(200).json({
		status: "success",
		data: teamMember,
	});
});

exports.create = asyncHandler(async (req, res) => {
	const { names, title, image, positionOnPage } = req.body;
	const teamMember = await TeamMember.create({
		names,
		title,
		image,
		positionOnPage,
		socialMedias,
	});
	res.status(201).json({
		status: "success",
		message: "member created successfully",
		data: teamMember,
	});
});

exports.update = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { names, title, image, positionOnPage, socialMedias } = req.body;

	await TeamMember.findByIdAndUpdate(id, {
		names,
		title,
		image,
		positionOnPage,
		socialMedias,
	});

	const newMember = await TeamMember.findById(id);
	res.status(200).json({
		status: " success",
		message: "member updated successfully",
		data: newMember.members,
	});
});

exports.delete = asyncHandler(async (req, res) => {
	const { id } = req.params;

	await TeamMember.findByIdAndUpdate(id, {
		hide: true,
	});

	res.status(204).json({
		status: "success",
		message: "member deleted successfully",
	});
});
