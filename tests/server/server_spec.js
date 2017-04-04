var expect = require('../../node_modules/chai/chai').expect;
var handler = require('../../server/food/foodRoutes.js');

var stubs = require('./stubs.js');

// Conditional async testing
// Will wait for test to be truthy before executing callback
function waitForThen (test, cb) {
  setTimeout(function () {
    test() ? cb.apply(this) : waitForThen(test, cb);
  }, 5);
}

describe('Node Server Request Listener Function', function () {

  xit('Should answer GET requests for food/foodRoutes with a 200 status code', function () {
    // This is a fake server request. Normally, the server would provide this,
    // but we want to test our function's behavior totally independent of the server code
    var req = new stubs.request('/api/food', 'GET');
    var res = new stubs.response();

    handler(req, res);

    expect(res._responseCode).to.equal(200);
    expect(res._ended).to.equal(true);
  });

  xit('Should send back parsable stringified JSON', function () {
    var req = new stubs.request('/food/foodRoutes', 'GET');
    var res = new stubs.response();

    handler.requestHandler(req, res);

    expect(JSON.parse.bind(this, res._data)).to.not.throw();
    expect(res._ended).to.equal(true);
  });

  xit('Should send back an object', function () {
    var req = new stubs.request('/food/foodRoutes', 'GET');
    var res = new stubs.response();

    handler.requestHandler(req, res);

    var parsedBody = JSON.parse(res._data);
    expect(parsedBody).to.be.an('object');
    expect(res._ended).to.equal(true);
  });

  xit('Should send an object containing a `results` array', function () {
    var req = new stubs.request('/food/foodRoutes', 'GET');
    var res = new stubs.response();

    handler.requestHandler(req, res);

    var parsedBody = JSON.parse(res._data);
    expect(parsedBody).to.have.property('results');
    expect(parsedBody.results).to.be.an('array');
    expect(res._ended).to.equal(true);
  });

  xit('Should accept posts to /food/foodRoutes', function () {
    var stubMsg = {
      catagory: 'Cheese',
      subcatagory: 'Cheddar',
    };
    var req = new stubs.request('/food/foodRoutes', 'POST', stubMsg);
    var res = new stubs.response();

    handler.requestHandler(req, res);

    // Expect 201 Created response status
    expect(res._responseCode).to.equal(201);

    // Testing for a newline isn't a valid test
    // TODO: Replace with with a valid test
    // expect(res._data).to.equal(JSON.stringify('\n'));
    expect(res._ended).to.equal(true);
  });

  xit('Should respond with messages that were previously posted', function () {
    var stubMsg = {
      catagory: 'Cheese',
      subcatagory: 'Cheddar',
    };
    var req = new stubs.request('/food/foodRoutes', 'POST', stubMsg);
    var res = new stubs.response();

    handler.requestHandler(req, res);

    expect(res._responseCode).to.equal(201);

    // Now if we request the log for that room the message we posted should be there:
    req = new stubs.request('/food/foodRoutes', 'GET');
    res = new stubs.response();

    handler.requestHandler(req, res);

    expect(res._responseCode).to.equal(200);
    var messages = JSON.parse(res._data).results;
    expect(messages.length).to.be.above(0);
    expect(messages[0].catagory).to.equal('Cheese');
    expect(messages[0].subcatagory).to.equal('Cheddar');
    expect(res._ended).to.equal(true);
  });

  xit('Should 404 when asked for a nonexistent file', function () {
    var req = new stubs.request('/food/foodRoutes', 'GET');
    var res = new stubs.response();

    handler.requestHandler(req, res);

    // Wait for response to return and then check status code
    waitForThen(
      function () { return res._ended; },
      function () {
        expect(res._responseCode).to.equal(404);
      });
  });

});
