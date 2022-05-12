const express = require("express");
const router = express.Router();
const S3Controller = require("../controllers/s3Controller");
const {checkAuth} = require("../passport");

router.get("/updateImage",checkAuth, S3Controller.uploadImage);
module.exports = router;