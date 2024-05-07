const mongoose = require("mongoose");
const sectionSchema = require("./sectionModel");
const aboutUsWhatWeDoSchema = mongoose.Schema({
	title: String,
	sections: [sectionSchema],
});
module.exports = aboutUsWhatWeDoSchema;
