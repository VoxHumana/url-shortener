const chai = require('chai');
const sinon = require('sinon');
const getOrCreateUrl = require('../routes/getOrCreateUrl');
const Url = require('../models/url');

const should = chai.should();


describe('URL shortening', () => {
  let findOneStub = {};
  beforeEach(() => {
    findOneStub = sinon.stub(Url, 'findOne');
  });

  afterEach(() => {
    Url.findOne.restore();
  });

  it('when url already exists, should return short url in response', () => {
    const req = {
      body: {
        url: 'http://longUrl.com',
      },
    };

    const res = {
      send: sinon.spy(),
    };

    const spy = res.send;

    findOneStub.yields(null, {_id: 'expectedId'});

    getOrCreateUrl(req, res);
    spy.calledOnce.should.be.equal(true);
    sinon.assert.calledWith(spy, {shortUrl: `${process.env.WEBHOST}expectedId`});
  });

  it('when url does not exist, should create new short url and return in response', () => {
    const req = {
      body: {
        url: 'http://longUrl.com',
      },
    };

    const res = {
      send: sinon.spy(),
    };
    const sendSpy = res.send;

    Url.save = sinon.spy();
    const saveSpy = Url.save;

    findOneStub.yields(null, null);

    getOrCreateUrl(req, res);
    sendSpy.calledOnce.should.be.equal(true);
    saveSpy.calledOnce.should.be.equal(true);
  });
});
