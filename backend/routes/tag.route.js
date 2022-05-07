const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');

// Get all tags
router.get('/', tagController.getAllTags);

// Get all questions per tag
router.post('/questionbytag', tagController.getTaggedQuestions);

// Update NumQuestions of tag
router.put('/updateNumQuestions/:tagId', tagController.updateNumQuestions);

// Search tag
router.get('/search/:name', tagController.searchTags);

// Add Tag (Admin only)
router.post('/add', tagController.createTag);


module.exports = router;