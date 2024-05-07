const mongoose = require("mongoose");

const contactUsSchema = mongoose.Schema(
	{
		name: String,
		phoneNumbers: [String],
		emails: [String],
		mapHeaderText: String,
		mapXcordinates: Number,
		mapYcordinates: Number,
		location: String,
		title: String,
		coverImage: {
			type: String,
		},
	},
	{
		timestamps: { createdAt: true, updatedAt: false },
	}
);

const ContactUs = new mongoose.model("ContactUs", contactUsSchema);

module.exports = ContactUs;
