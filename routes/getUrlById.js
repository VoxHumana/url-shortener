const Url = require('../models/url');

module.exports = function (req, res) {
  Url.findOne({_id: req.params.shortId}, (err, doc) => {
    if (doc) {
      res.redirect(doc.long_url);
    } else {
      res.status(404).send({message: `Failed to redirect for ${process.env.WEBHOST}${req.params.shortId}`});
    }
  });
};
