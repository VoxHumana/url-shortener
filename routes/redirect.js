const express = require('express');

const router = express.Router();
const getUrlById = require('./getUrlById');

router.get('/:shortId', getUrlById);

module.exports = router;
