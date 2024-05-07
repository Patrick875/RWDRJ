//jshint esversion:9
const cloudinary = require("cloudinary");
const asyncHandler = require("./asyncHandler");

exports.siteInfoImageUploader = asyncHandler(async (req, res, next) => {
	let logoImage = [req.body.logo];
	let logoImagePromisses = [];

	if (req.body.logo) {
		logoImagePromisses = logoImage.map((logImg) => {
			return cloudinary.v2.uploader.upload(
				logImg,
				{
					folder: "RWDRJ-site-info",
					asset_id: "logo-image",
				},
				function (error, result) {
					console.log(error);
				}
			);
		});
		logoImage = await Promise.all(logoImagePromisses);
		logoImage = logoImage.map((logImg) => logImg.secure_url);
		req.body.logo = logoImage[0];
		console.log("logo image loaded");
		return next();
	} else {
		console.log("no logo available");
		return next();
	}
});
exports.aboutUsPageImageUploader = asyncHandler(async (req, res, next) => {
	let sliderImages = [];
	let sliderImagePromisses = [];
	let uploadedImages = [];
	if (req.body && req.body.herosection && req.body.herosection.sliderImages) {
		sliderImages = [...req.body.herosection.sliderImages];
		uploadedImages = sliderImages.filter((item) =>
			item.startsWith("https://") ? item : null
		);
		sliderImagePromisses = sliderImages.filter((sliderImg) => {
			if (!sliderImg.startsWith("https://")) {
				return cloudinary.v2.uploader.upload(
					logImg,
					{
						folder: "RWDRJ-about-us-slider-images",
						asset_id: "logo-image",
					},
					function (error, result) {
						console.log(error);
					}
				);
			}
		});

		let sliderImagesToCloud = await Promise.all(sliderImagePromisses);

		sliderImagesToCloud =
			sliderImagesToCloud.length !== 0
				? sliderImagesToCloud.map((sliderImg) => sliderImg.secure_url)
				: [];
		req.body.herosection.sliderImages =
			sliderImagesToCloud.length === sliderImages.length
				? sliderImagesToCloud
				: [...sliderImagesToCloud, ...uploadedImages];
		console.log("slider images loaded");
		return next();
	} else {
		console.log("no slider images uploaded");
		return next();
	}
});
exports.contactUsPageImageUploader = asyncHandler(async (req, res, next) => {
	let coverImage = [...req.body.coverImage];
	let coverImagePromisses = [];
	if (req.body.coverImage) {
		let coverImageUploaded = coverImage.filter((item) =>
			item.startsWith("https://") ? item : null
		);
		coverImagePromisses = coverImage.filter((coverImg) => {
			if (!coverImg.startsWith("https://")) {
				return cloudinary.v2.uploader.upload(
					coverImg,
					{
						folder: "RWDRJ-about-us-slider-images",
						asset_id: "contact-us-cover-image",
					},
					function (error, result) {
						console.log(error);
					}
				);
			}
		});

		let coverImagesToCloud = await Promise.all(coverImagePromisses);

		coverImagesToCloud =
			coverImagesToCloud.length !== 0
				? coverImagesToCloud.map((coverImg) => coverImg.secure_url)
				: [];
		let result =
			coverImagesToCloud.length === coverImage.length
				? coverImagesToCloud
				: [...coverImagesToCloud, ...coverImageUploaded];
		req.body.coverImage = result[0];
		console.log("slider images loaded");
		return next();
	} else {
		console.log("no slider images uploaded");
		return next();
	}
});

exports.partnerTeamMemberImageUploader = asyncHandler(
	async (req, res, next) => {
		if (req.body.image || req.body.logo) {
			const isImage = req.body.image;
			const image = isImage ? req.body.image : req.body.logo;
			await cloudinary.v2.uploader
				.upload(
					image,
					{
						folder: isImage ? "RWDRJ-member-image" : "RWDRJ-partner-logo",
						asset_id: isImage ? "team-member" : "partner-logo",
					},
					function (error, result) {
						console.log(error);
					}
				)
				.then((result) => {
					// updating  the body
					if (isImage) {
						req.body.image = result.secure_url;
					} else {
						req.body.logo = result.secure_url;
					}
				})
				.catch((error) => {
					// Error occurred during upload
					console.error("Error uploading image to Cloudinary:", error);
					res.status(500).json({ error: "Failed to upload image" });
				});

			return next();
		} else {
			console.log("no image or logo uploaded");
			return next();
		}
	}
);

exports.blogImageUploader = asyncHandler(async (req, res, next) => {
	let galleryPromises = [];
	let coverImagePromises = [];
	let inContentImagePromisses = [];
	let gallery = [req.body.gallery];
	let coverImage = [req.body.coverImage];
	let inContentImages = [req.body.inContentImages];
	if (req.body.gallery || req.body.coverImage || req.body.inContentImages) {
		if (req.body.gallery) {
			galleryPromises = gallery.map((gallImage) => {
				return cloudinary.v2.uploader.upload(
					gallImage.img,
					{
						folder: "RWDRJ-blog-images",
						asset_id: req.body.title + "-images",
					},
					function (error, result) {
						console.log(error);
					}
				);
			});
			gallery = await Promise.all(galleryPromises);
			gallery = gallery.map((gallImag) => gallImag.secure_url);
			req.body.gallery = {
				link: profileImage[0],
				alt: gallImage.alt,
				status: "public",
			};
		}
		if (req.body.coverImage) {
			coverImagePromises = coverImage.map((covImag) => {
				return cloudinary.v2.uploader.upload(
					covImag,
					{
						folder: "RWDRJ-blog-images",
						asset_id: req.body.title + "-cover",
					},
					function (error, result) {
						console.log(error);
					}
				);
			});
			coverImage = await Promise.all(coverImagePromises);
			coverImage = coverImage.map((covImag) => covImag.secure_url);
			req.body.coverImage = coverImage[0];
		}
		if (req.body.inContentImages) {
			inContentImagePromisses = req.body.inContentImages.map((image) => {
				return cloudinary.v2.uploader.upload(
					image,
					{
						folder: "RWDRJ-blog-images",
						asset_id: req.body.name,
					},
					function (error, result) {
						console.log(error);
					}
				);
			});
			inContentImages = await Promise.all(inContentImagePromisses);
			inContentImages = inContentImages.map((image) => image.secure_url);
			req.body.inContentImages = inContentImages;
		}
		console.log("IMAGE UPLOADER ......");

		return next();
	} else {
		console.log("NO IMAGES ON BODY ......");
		return next();
	}
});
