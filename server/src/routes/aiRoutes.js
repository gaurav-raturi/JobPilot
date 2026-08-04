const express = require('express');
const router = express.Router();

const { chatWithAI } = require('../controllers/aiControllers');

router.post('/chat', chatWithAI);

module.exports = router;