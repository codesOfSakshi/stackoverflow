const express = require("express");
const router = express.Router();
const S3Controller = require("../controllers/s3Controller");

router.post("/updateImage", S3Controller.uploadImage);
module.exports = router;