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
  it('Should return an error', (done) => {
    const MockJoke = sinon.mock(Joke);
    const expectedResult = { status: false, error: 'Something went wrong' };
    MockJoke.expects('find').yields(null, expectedResult);
    Joke.find((err, result) => {
      MockJoke.verify();
      MockJoke.restore();
      expect(result.status).not.to.be.true;
      done();
    });
  });
});

describe('Post a new joke', () => {
  it('Should post a new joke', (done) => {
    const MockJoke = sinon.mock(new Joke({ joke: 'Mock joke' }));
    const joke = MockJoke.object;
    const expectedResult = { status: false };
    MockJoke.expects('save').yields(expectedResult, null);
    joke.save((err, result) => {
      MockJoke.verify();
      MockJoke.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});
