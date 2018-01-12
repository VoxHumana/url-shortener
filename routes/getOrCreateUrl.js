const Url = require('../models/url');
const shortid = require('shortid');

module.exports = async (req, res) => {
  const original = req.body.url;

  try {
    let url = await Url.findOne({ original });

    if (url) {
      res.status(200);
      res.send({
        message: `URL retrieved for ${url.original}`,
        url: `${process.env.WEBHOST}${url.suffix}`,
        created: url.created,
      });
    } else {
      const newUrl = Url({
        suffix: shortid.generate(),
        original,
      });

      url = await newUrl.save();
      res.status(200);
      res.send({
        message: `URL created for ${url.original}`,
        url: `${process.env.WEBHOST}${url.suffix}`,
        created: url.created,
      });
    }
  } catch (err) {
    res.status(500);
    res.send({
      error: "Something's wrong, fix it right meow! (ﾐⓛᆽⓛﾐ)✧",
    });
  }
};
