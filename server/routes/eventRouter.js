const express = require("express");
const eventsController = require("./../controllers/eventsController");
const { blogImageUploader } = require("./../utils/imageUploader");
const router = express.Router();

router
	.route("/")
	.get(eventsController.getAll)
	.post(blogImageUploader, eventsController.create)
	.delete(eventsController.deleteAll);
router
	.route("/:refId")
	.get(eventsController.getOne)
	.patch(blogImageUploader, eventsController.update)
	.delete(eventsController.deleteOne);

module.exports = router;
