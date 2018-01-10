const chai = require('chai');

const should = chai.should();
const app = require('../app');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Index', () => {
  it('when GET request is received for "/", should respond with welcome message', async () => {
    const res = await chai.request(app).get('/');
    res.should.have.status(200);
    res.body.should.include({message: 'Hello and welcome to my url shortener!'});
  });
});
