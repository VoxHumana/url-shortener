const express = require('express');

const router = express.Router();
const getUrlById = require('../controllers/getUrlById');

router.get('/:suffix', getUrlById);

module.exports = router;
