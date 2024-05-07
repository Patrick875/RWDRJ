const Event = require("../models/event");
const asyncHandler = require("../utils/asyncHandler");
const crypto = require("crypto");

exports.getAll = asyncHandler(async (req, res) => {
	const events = await Event.find().sort({ datePosted: -1 });

	return res.status(200).json({
		status: "success",
		data: events,
		length: events.length,
	});
});
exports.getOne = asyncHandler(async (req, res) => {
	const { refId } = req.params;
	const event = await Event.findOne({ refId });

	return res.status(200).json({
		status: "Success",
		data: event,
	});
});
exports.create = asyncHandler(async (req, res) => {
	const {
		title,
		description,
		coverImage,
		gallery,
		datestart,
		dateend,
		postedBy,
	} = req.body;
	if (!title || !description || !datestart || !dateend) {
		return res.status(400).json({
			status: "Bad request",
			message: "title,description,starting date, ending date are required",
		});
	}
	const newEvent = await Event.create({
		refId: crypto.randomUUID(),
		title,
		datePosted: new Date(),
		coverImage,
		description,
		datestart: new Date(datestart).toISOString(),
		dateend: new Date(dateend).toISOString(),
		gallery,
		postedBy,
	});

	if (newEvent) {
		await Event.findByIdAndUpdate(newEvent._id, {
			link: `${process.env.serverURL + "events" + `${newEvent.refId}`}}`,
		});
	}
	return res.status(201).json({
		status: "Success",
		data: newEvent,
		message: "success",
	});
});

exports.update = asyncHandler(async (req, res) => {
	const { refId } = req.params;

	const { title, description, coverImage, gallery, datestart, dateend } =
		req.body;
	const event = await Event.findOneAndUpdate(
		{ refId },
		{ title, description, coverImage, gallery, datestart, dateend }
	);
	return res.status(203).json({
		status: "Success",
		data: event,
	});
});

exports.deleteOne = asyncHandler(async (req, res) => {
	const { refId } = req.params;

	await Event.findOneAndDelete({ refId });

	return res.status(200).json({
		status: "Success",
		message: "event deleted successfully !!!",
	});
});

exports.deleteAll = asyncHandler(async (req, res) => {
	await Event.deleteMany();
	return res.status(204).json({
		status: "Success",
		message: "All events deleted !!!",
	});
});
