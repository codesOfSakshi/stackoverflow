const express = require("express");
const router = express.Router();
const SearchController = require("../controllers/search");

router.post("/", SearchController.search);

module.exports = router;
