const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({
    message: 'Hello and welcome to my url shortener!',
  });
});

module.exports = router;
