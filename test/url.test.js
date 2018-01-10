const should = require('chai').should();
const shortid = require('shortid');

const Url = require('../models/url');

describe('URL object schema', () => {
  it('validate should not contain errors if all fields are valid', async () => {
    const url = Url({
      _id: shortid.generate(),
      long_url: 'http://www.google.com',
      created_at: new Date(),
    });

    const err = await url.validate();
    should.not.exist(err.errors);
  });

  it('validate should contain errors if long_url is empty', (done) => {
    const url = new Url();
    url.validate((err) => {
      should.exist(err.errors);
      err.errors.should.have.property('long_url');
      done();
    });
  });
});
