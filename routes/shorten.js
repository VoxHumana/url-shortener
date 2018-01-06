const express = require('express');
const shortid = require('shortid');

const router = express.Router();
const Url = require('../models/url');

router.post('/api/shorten', (req, res) => {
  const longUrl = req.body.url;

  Url.findOne({long_url: longUrl}, (err, doc) => {
    if (doc) {
      res.send({shortUrl: `${process.env.WEBHOST}${doc._id}`});
    } else {
      const uuid = shortid.generate();
      const newUrl = Url({
        _id: uuid,
        long_url: longUrl,
        created_at: new Date(),
      });

      newUrl.save((error, document) => {
        if (error) {
          console.error(error);
        }
        res.send({shortUrl: `${process.env.WEBHOST}${document._id}`});
      });
    }
  });
});

module.exports = router;