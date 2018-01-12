const express = require('express');
const getOrCreateUrl = require('../controllers/getOrCreateUrl');

const router = express.Router();

router.post('/api/shorten', getOrCreateUrl);

module.exports = router;
