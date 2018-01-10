const express = require('express');
const getOrCreateUrl = require('./getOrCreateUrl');

const router = express.Router();

router.post('/api/shorten', getOrCreateUrl);

module.exports = router;
