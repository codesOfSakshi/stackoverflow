const express = require("express");
const router = express.Router();
const Tag = require("../controllers/tag");

router.post("/addTag", Tag.addTag);

module.exports = router;