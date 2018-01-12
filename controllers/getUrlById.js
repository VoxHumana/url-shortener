const Url = require('../models/url');

module.exports = async (req, res) => {
  const suffix = req.params.suffix;
  if (suffix) {
    try {
      const url = await Url.findOne({ suffix });

      if (url) {
        res.redirect(url.original);
      } else {
        const reqUrl = require('url').format({
          protocol: req.protocol,
          host: req.get('host'),
          pathname: req.originalUrl,
        });
        res.status(400);
        res.send({
          error: `Failed to redirect for ${reqUrl}`,
        });
      }
    } catch (err) {
      res.status(500);
      res.send({
        error: "Something's wrong, fix it right meow! (ﾐⓛᆽⓛﾐ)✧",
      });
    }
  } else {
    res.status(400).send('Invalid short URL');
  }
};
