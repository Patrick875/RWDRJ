const { Partner } = require("../models/partnersModel");
const asyncHandler = require("../utils/asyncHandler");

exports.get = asyncHandler(async (req, res) => {
	const partner = await Partner.find({ visible: true });
	res.status(200).json({
		status: "success",
		data: partner,
	});
});
exports.getOne = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const partner = await Partner.findOne({ _id: id });
	res.status(200).json({
		status: "success",
		data: partner,
	});
});

exports.create = asyncHandler(async (req, res) => {
	const { logo, link } = req.body;
	const partner = await Partner.create({
		logo,
		link,
	});
	res.status(201).json({
		status: "success",
		message: "partner created successfully",
		data: partner,
	});
});

exports.update = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { logo, link } = req.body;

	await Partner.findOneAndUpdate(
		{ _id: id },
		{
			logo,
			link,
		}
	);

	const newPartner = await Partner.findOne({ _id: id });
	res.status(203).json({
		status: " success",
		message: "partner updated successfully",
		data: newPartner,
	});
});

exports.delete = asyncHandler(async (req, res) => {
	const { id } = req.params;

	await Partner.findByIdAndUpdate(id, {
		visible: false,
	});

	res.status(204).json({
		status: "success",
		message: "member deleted successfully",
	});
});
