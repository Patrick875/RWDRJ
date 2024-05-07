const SiteInfo = require("../models/siteInfo");
const asyncHandler = require("../utils/asyncHandler");

exports.get = asyncHandler(async (req, res) => {
	const siteInfo = await SiteInfo.find();
	res.status(200).json({
		status: "success",
		data: siteInfo,
	});
});

exports.create = asyncHandler(async (req, res) => {
	const { logo, title, subtitle, description } = req.body;
	const siteInfo = await SiteInfo.create({
		logo,
		title,
		subtitle,
		description,
	});

	return res.status(201).json({
		status: "success",
		data: siteInfo,
		message: "site info created",
	});
});

exports.update = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { logo, title, subtitle, description } = req.body;

	await SiteInfo.findOneAndUpdate(
		{ _id: id },
		{ logo, title, subtitle, description }
	);

	const newData = await SiteInfo.findById(id);

	return res.status(203).json({
		data: newData,
		status: "success",
		message: "site info updated",
	});
});
