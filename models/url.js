const shortid = require('shortid');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const urlSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  long_url: String,
  created_at: Date,
});
const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
