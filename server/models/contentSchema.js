const mongoose = require("mongoose");

const contentSchema = mongoose.Schema({
	content: String,
	quoted: {
		type: Boolean,
		default: false,
	},
});

module.exports = contentSchema;
