const Url = require('../models/url');

module.exports = async (req, res) => {
  if (req.params.shortId) {
    try {
      const url = await Url.findOne({ _id: req.params.shortId });

      if (url) {
        res.redirect(url.long_url);
      } else {
        res.status(404);
        res.send({ message: `Failed to redirect for ${process.env.WEBHOST}${req.params.shortId}` });
      }
    } catch (err) {
      res.status(500);
    }
  } else {
    res.status(400).send('Invalid short URL');
  }
};
