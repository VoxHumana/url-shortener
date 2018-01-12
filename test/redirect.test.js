const sinon = require('sinon');
const chai = require('chai');

const should = chai.should();
const getUrlById = require('../routes/getUrlById');

const Url = require('../models/url');

describe('redirection', () => {
  beforeEach(() => {
    sinon.stub(Url, 'findOne').yields(null, {original: 'http://expectedUrl.com'});
  });

  afterEach(() => {
    Url.findOne.restore();
  });

  it('when shortened url with valid suffix is received, should redirect to corresponding full url', () => {
    const req = {
      params: {
        suffix: 'a_valid_id',
      },
    };
    const res = {
      redirect: sinon.spy(),
    };
    const spy = res.redirect;

    getUrlById(req, res);
    spy.calledOnce.should.be.equal(true);
    sinon.assert.calledWith(spy, 'http://expectedUrl.com');
  });
});
