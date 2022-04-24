const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');

// Get all tags
router.get('/tags', tagController.getAllTags);

// Get all questions per tag
router.get('//questionbytag/:tagId', tagController.getTaggedQuestions);

// Update NumQuestions of tag
router.put('/tags/updateNumQuestions/:tagId', tagController.updateNumQuestions);

// Search tag
router.get('/tags/search/:name', tagController.searchTags);

// Add Tag (Admin only)
router.post('/tags/add', tagController.createTag);


module.exports = router;