const Blog = require("../models/blog");
const asyncHandler = require("../utils/asyncHandler");
const crypto = require("crypto");
exports.getAll = asyncHandler(async (req, res) => {
	const blogs = await Blog.find().sort({ datePosted: -1 });

	return res.status(200).json({
		status: "success",
		data: blogs,
		length: blogs.length,
	});
});
exports.getOne = asyncHandler(async (req, res) => {
	const { refId } = req.params;
	const blog = await Blog.findOne({ refId });

	return res.status(200).json({
		status: "Success",
		data: blog,
	});
});
exports.create = asyncHandler(async (req, res) => {
	const { title, content, coverImage, inContentImages, gallery, postedBy } =
		req.body;
	if (!title || !content) {
		return res.status(400).json({
			status: "Bad request",
			message: "title and content are required",
		});
	}
	const newBlog = await Blog.create({
		refId: crypto.randomUUID(),
		title,
		datePosted: new Date(),
		coverImage,
		content,
		inContentImages,
		gallery,
		postedBy,
	});

	if (newBlog) {
		await Blog.findByIdAndUpdate(newBlog._id, {
			link: `${process.env.serverURL}/blogs/${newBlog.refId}`,
		});
	}

	return res.status(201).json({
		status: "Success",
		data: newBlog,
		message: "success",
	});
});

exports.update = asyncHandler(async (req, res) => {
	const { refId } = req.params;

	const { title, content, coverImage, contentImages, gallery } = req.body;
	const blog = await Blog.findOneAndUpdate(
		{ refId },
		{ title, content, coverImage, contentImages, gallery }
	);
	return res.status(203).json({
		status: "Success",
		data: blog,
	});
});

exports.deleteOne = asyncHandler(async (req, res) => {
	const { refId } = req.params;

	await Blog.findOneAndDelete({ refId });

	return res.status(200).json({
		status: "Success",
		message: "blog deleted successfully !!!",
	});
});

exports.deleteAll = asyncHandler(async (req, res) => {
	await Blog.deleteMany();
	return res.status(204).json({
		status: "Success",
		message: "All blogs deleted !!!",
	});
});
