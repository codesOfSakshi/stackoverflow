const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');
const {checkAuth} = require("../passport");

// Get all tags
router.get('/', tagController.getAllTags);

// Get all questions per tag
router.post('/questionbytag', tagController.getTaggedQuestions);

router.post('/userquestionbytag', tagController.getUserTaggedQuestions);


// Update NumQuestions of tag
router.put('/updateNumQuestions/:tagId',checkAuth, tagController.updateNumQuestions);

// Search tag
router.get('/search/:name', tagController.searchTags);

// Add Tag (Admin only)
router.post('/add', tagController.createTag);

router.get('/badges/:userId',checkAuth, tagController.tagToBadge);


module.exports = router;