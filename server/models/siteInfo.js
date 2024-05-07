const mongoose = require("mongoose");

const siteInfoSchema = mongoose.Schema({
	logo: String,
	title: String,
	subtitle: String,
	description: String,
});

const SiteInfo = new mongoose.model("SiteInfo", siteInfoSchema);

module.exports = SiteInfo;
