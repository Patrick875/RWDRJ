const mongoose = require("mongoose");

const Statistic = mongoose.Schema({
	title: {
		type: String,
		trim: true,
	},
	currentNumber: Number,
	andMore: { type: Boolean, default: false },
});

const aboutUsNumbersSchema = mongoose.Schema({
	title: String,
	statiticGroups: [Statistic],
});

module.exports = aboutUsNumbersSchema;
