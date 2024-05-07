const Blog = require("../models/blog");
const Event = require("../models/event");
const asyncHandler = require("../utils/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
	const blogs = await Blog.find().sort({ datePosted: -1 });
	const events = await Event.find().sort({ datePosted: -1 });

	return res.status(200).json({
		status: "success",
		data: [...blogs, ...events],
		length: blogs.length + events.length,
	});
});
