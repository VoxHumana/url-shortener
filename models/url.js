const shortid = require('shortid');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const urlSchema = new Schema({
  suffix: {
    type: String,
    required: true,
    unique: true,
    default: shortid.generate,
  },
  original: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
