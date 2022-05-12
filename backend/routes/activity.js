const express = require("express");
const router = express.Router();
const ActivityController = require("../controllers/activity")
const {checkAuth} = require("../passport");

router.get("/", ActivityController.test);
router.get("/:activityID",checkAuth, ActivityController.getActivities);

module.exports = router;