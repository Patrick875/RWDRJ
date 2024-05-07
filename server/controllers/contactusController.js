const asyncHandler = require("../utils/asyncHandler");
const ContactUs = require("./../models/contactus");

exports.get = asyncHandler(async (req, res) => {
	const contactusData = await ContactUs.find();

	return res.status(200).json({
		status: "success",
		data: contactusData,
	});
});

exports.create = asyncHandler(async (req, res) => {
	const { name, phoneNumbers, emails, location, title, coverImage } = req.body;

	await ContactUs.create({
		phoneNumbers,
		emails,
		location,
		mapHeaderText,
		mapXcordinates,
		mapYcordinates,
		title,
		coverImage,
	});
	res.status(201).json({
		status: "success",
		message: "Page created successfully",
	});
});

exports.update = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const {
		name,
		mapHeaderText,
		mapXcordinates,
		mapYcordinates,
		phoneNumbers,
		emails,
		location,
		title,
		coverImage,
	} = req.body;
	const contactus = await ContactUs.findOneAndUpdate(
		{ _id: id },
		{
			name,
			phoneNumbers,
			emails,
			location,
			mapHeaderText,
			mapXcordinates,
			mapYcordinates,
			title,
			coverImage,
		}
	);
	res.status(203).json({
		status: "success",
		data: contactus,
		message: "contactus updated",
	});
});
