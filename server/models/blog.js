const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
	refId: String,
	title: {
		type: String,
		trim: true,
		unique: ["blog with title already exists"],
	},
	datePosted: { type: Date, default: Date.now },
	coverImage: {
		type: String,
		trim: true,
	},
	content: {
		type: String,
		trim: true,
	},
	status: {
		type: String,
		enum: ["public", "hidden", "draft", "deleted"],
		default: "public",
	},

	link: String,
	inContentImages: [
		{
			type: String,
		},
	],
	postedBy: { type: String, default: "RWDRJ" },
	gallery: [
		{
			link: String,
			alt: String,
			status: {
				type: String,
				enum: ["public", "hidden", "draft", "deleted"],
				default: "public",
			},
		},
	],
});

const Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog;
