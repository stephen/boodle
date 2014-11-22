var Parse = require('parse').Parse;
var getBaseModel = require('./baseModel');

class Beedle {

  constructor(applicationId, javascriptKey) {
    this.applicationId = applicationId;
    this.javascriptKey = javascriptKey;
    this.parseClient = Parse;

    Parse.initialize(this.applicationId, this.javascriptKey);
  }

  get BaseModel() {
    return getBaseModel(Parse);
  }

}

module.exports = Beedle;
