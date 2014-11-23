var Parse = require('parse').Parse;
var getBaseModel = require('./baseModel');

class Boodle {

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

module.exports = Boodle;
