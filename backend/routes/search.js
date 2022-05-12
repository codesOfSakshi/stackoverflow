const express = require("express");
const router = express.Router();
const SearchController = require("../controllers/search");

router.post("/", SearchController.search);
router.post("/name", SearchController.searchUsersByName);
router.get("/searchquery", SearchController.searchCustomQuery);

module.exports = router;