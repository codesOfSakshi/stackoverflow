const express = require("express");
const router = express.Router();
const S3Controller = require("../controllers/S3Controller");

router.post("/updateImage", S3Controller.uploadImage);