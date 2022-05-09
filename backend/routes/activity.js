const express = require("express");
const router = express.Router();
const ActivityController = require("../controllers/activity")

router.get("/", ActivityController.test);
router.get("/:activityID", ActivityController.getActivities);

module.exports = router;