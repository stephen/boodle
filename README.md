beedle
======

Beedle is an experimental ES6 ODM for [parse.com](parse.com) backends. It lets you do delightful things like `yield` for asynchronous tasks, directly get or set model values, and use the new ES6 class definitions.

## example

```javascript
co(function* () {

  // shiny new es6 class syntax
  class TestModel extends BaseModel {

    // working on making this better, but...
    get definition() {
      return {
        test: 'string'
      };
    }
  }

  // put a new model in the db
  var createdModel = yield TestModel.generate();
  var newToken = createdModel.token;

  // re-fetch from the db
  var loadedModel = yield TestModel.load(newToken);

  // we can directly set model properties:
  loadedModel.test = 'hello';
  yield loadedModel.save();

  // let's reload the model from the db for kicks
  yield loadedModel.refresh();

  // this will output 'hello'!
  console.log(loadedModel.test);

  // good bye model...
  yield loadedModel.delete();

  // this is null:
  var deletedModel = yield TestModel.load(newToken);
});
```
