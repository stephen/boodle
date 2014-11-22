var assert = require('assert');
var helpers = require('./helpers');
var coIt = helpers.coIt;

var Beedle = require('../bin/');
var beedle = new Beedle(helpers.TEST_APP_ID, helpers.TEST_JS_KEY);
var BaseModel = beedle.BaseModel;

describe('BaseModel', () => {

  coIt('should create, load, then delete model', function *() {

    var createdModel = yield BaseModel.generate();
    assert.notEqual(createdModel, null, 'generated model is null');

    var newToken = createdModel.token;

    var loadedModel = yield BaseModel.load(createdModel.token);
    assert.equal(loadedModel.token, newToken, 'loaded model token does not match');

    yield loadedModel.delete();
    var deletedModel = yield BaseModel.load(loadedModel.token);
    assert.strictEqual(deletedModel, null, 'model not deleted');

  });

});
