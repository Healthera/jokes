const sinon = require('sinon');
const chai = require('chai');
const mongoose = require('mongoose');

const expect = chai.expect;

require('sinon-mongoose');

const Joke = require('../app/models/joke.model');

describe('Get all Jokes', () => {
  it('Should  return all jokes', (done) => {
    const MockJoke = sinon.mock(Joke);
    const expectedResult = { status: true, joke: 'Some mock joke' };
    MockJoke.expects('find').yields(null, expectedResult);
    Joke.find((err, result) => {
      MockJoke.verify();
      MockJoke.restore();
      expect(result.status).to.be.true;
      done();
    });
  });
});
