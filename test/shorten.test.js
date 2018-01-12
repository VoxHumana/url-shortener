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

  it('when url already exists, should return short url in response', async () => {
    const req = {
      body: {
        url: 'http://longUrl.com',
      },
    };

    const res = {
      send: sinon.spy(),
      status: sinon.spy(),
    };

    const spy = res.send;

    findOneStub.resolves({suffix: 'expectedId'});

    await getOrCreateUrl(req, res);
    res.send.calledOnce.should.be.equal(true);
    res.status.calledOnce.should.be.equal(true);
  });

  it('when url does not exist, should create new short url and return in response', async () => {
    const req = {
      body: {
        url: 'http://longUrl.com',
      },
    };

    const res = {
      send: sinon.spy(),
    };

    Url.save = sinon.spy();

    findOneStub.resolves(null);

    await getOrCreateUrl(req, res);
    Url.save.calledOnce.should.be.equal(true);
    res.send.calledOnce.should.be.equal(true);
  });
});
