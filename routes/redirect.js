const express = require('express');

const router = express.Router();
const getUrlById = require('../controllers/getUrlById');

router.get('/s/:suffix', getUrlById);

module.exports = router;
