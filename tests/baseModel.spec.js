var assert = require('assert');
var helpers = require('./helpers');
var coIt = helpers.coIt;

var Boodle = require('../bin/');
var boodle = new Boodle(helpers.TEST_APP_ID, helpers.TEST_JS_KEY);
var BaseModel = boodle.BaseModel;

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

  coIt('should set a value on the model', function *() {

    class TestModel extends BaseModel {
      get definition() {
        return {
          test: 'is a thing'
        };
      }
    }

    var createdModel = yield TestModel.generate();
    assert.notEqual(createdModel, null, 'generated model is null');

    var newToken = createdModel.token;

    var loadedModel = yield TestModel.load(createdModel.token);
    assert.equal(loadedModel.token, newToken, 'loaded model token does not match');

    loadedModel.test = 'hello';
    yield loadedModel.save();

    loadedModel = yield TestModel.load(createdModel.token);
    assert.equal(loadedModel.test, 'hello', 'loaded model test value does not match');

    yield loadedModel.delete();
    var deletedModel = yield TestModel.load(loadedModel.token);
    assert.strictEqual(deletedModel, null, 'model not deleted');

  });

});
