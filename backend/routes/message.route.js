const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

// Get all tags
router.post('/sendmessage', messageController.sendMessage);

// Receive all messages for user
router.get('/receiveAllMessages', messageController.receiveAllMessages);

// Receive all messages between user and another user
router.get('/receiveChat', messageController.receiveChat);


module.exports = router;