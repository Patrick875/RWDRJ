const mongoose = require("mongoose");

const ourTeamPageSchema = mongoose.Schema(
	{
		name: String,
		title: String,
		subtitle: String,
		coverImage: String,
	},
	{
		timestamps: { createdAt: true, updatedAt: false },
	}
);

const OurTeamPage = mongoose.model("OurTeamPage", ourTeamPageSchema);

module.exports = OurTeamPage;
