const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin");

router.get("/", AdminController.test);
router.post("/approval/", AdminController.approve);
router.post("/analytics/", AdminController.getAnalytics);

module.exports = router;