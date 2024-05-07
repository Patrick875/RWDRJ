const mongoose = require("mongoose");

const partnerSchema = mongoose.Schema({
	logo: String,
	link: String,
	visible: {
		type: Boolean,
		default: true,
	},
});

const Partner = mongoose.model("Partner", partnerSchema);

module.exports = { Partner, partnerSchema };
