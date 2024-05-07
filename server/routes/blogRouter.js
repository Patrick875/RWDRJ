const express = require("express");
const blogController = require("./../controllers/blogController");
const { blogImageUploader } = require("./../utils/imageUploader");
const router = express.Router();

router
	.route("/")
	.get(blogController.getAll)
	.post(blogImageUploader, blogController.create)
	.delete(blogController.deleteAll);
router
	.route("/:refId")
	.get(blogController.getOne)
	.patch(blogImageUploader, blogController.update)
	.delete(blogController.deleteOne);

module.exports = router;
