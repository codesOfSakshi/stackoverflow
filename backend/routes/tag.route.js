const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');

// Get all tags
router.get('/', tagController.getAllTags);

// Get all questions per tag
router.get('/questionbytag/:tagId', tagController.getTaggedQuestions);

// Update NumQuestions of tag
router.put('/updateNumQuestions/:tagId', tagController.updateNumQuestions);

// Search tag
router.get('/search/:name', tagController.searchTags);

// Add Tag (Admin only)
router.post('/add', tagController.createTag);

router.get('/badges/:userId', tagController.tagToBadge);


module.exports = router;