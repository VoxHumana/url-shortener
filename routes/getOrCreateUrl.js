const Url = require('../models/url');
const shortid = require('shortid');

module.exports = async (req, res) => {
  const longUrl = req.body.url;

  try {
    let url = await Url.findOne({long_url: longUrl});

    if (url) {
      res.status(200);
      res.send({
        message: `Shortened URL retrieved for ${url.long_url}`,
        shortUrl: `${process.env.WEBHOST}${url._id}`,
        date: `${url.created_at}`,
      });
    } else {
      const uuid = shortid.generate();
      const newUrl = Url({
        _id: uuid,
        long_url: longUrl,
        created_at: new Date(),
      });

      url = await newUrl.save();
      res.status(200);
      res.send({
        message: `Shortened URL created for ${url.long_url}`,
        shortUrl: `${process.env.WEBHOST}${url._id}`,
        date: `${url.created_at}`,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
