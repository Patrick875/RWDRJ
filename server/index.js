const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const cloudinary = require("cloudinary").v2;

cloudinary.config({
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	cloud_name: process.env.CLOUDINARY_API_CLIENT_NAME,
});
const app = require("./app");

const PORT = 8080;
const DB = process.env.ONLINE_DATABASE_URL;

mongoose
	.connect(DB)
	.then(() => {
		console.log("DB connection successful");
		app.listen(PORT, "0.0.0.0", () => {
			console.log(`App running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log("err", err);
	});
