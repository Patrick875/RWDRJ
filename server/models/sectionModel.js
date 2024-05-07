const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema({
	title: {
		type: String,
		trim: true,
	},
	content: [
		{
			type: String,
			trim: true,
		},
	],
	coverImage: {
		type: String,
		trim: true,
	},
	// hasButton:Boolean
	linkText: String,
	link: String,
});

module.exports = sectionSchema;
