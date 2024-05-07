const mongoose = require("mongoose");

const heroSectionSchema = mongoose.Schema({
	sliderImages: [{ type: String }],
	subtitle: String,
	title: String,
	buttonText: String,
});

module.exports = heroSectionSchema;
