const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
	refId: String,
	title: {
		type: String,
		trim: true,
		unique: [true, "event with name already exists"],
	},
	datestart: {
		type: Date,
		trim: true,
	},

	dateend: {
		type: Date,
		trim: true,
	},

	datePosted: { type: Date, default: Date.now },
	coverImage: {
		type: String,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	status: {
		type: String,
		enum: ["public", "hidden", "draft", "deleted"],
		default: "public",
	},
	link: String,
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

const Event = new mongoose.model("Event", eventSchema);

module.exports = Event;
