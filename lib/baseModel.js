var util = require('util');

class BaseModel {
  constructor(parseData) {
    if (!parseData) {
      throw new Error('Parse data cannot be empty when generating new model');
    }
    this._parse = parseData;
  }

  get token() {
    return this._parse.id;
  }

  get created() {
    return new Date(this._parse.createdAt).getTime() / 1000;
  }

  get(key) {
    return this._parse.get(key);
  }

  set(key, value) {
    this._parse.set(key, value);
  }

  refresh() {
    return this._parse.fetch();
  }

  save() {
    return this._parse.save();
  }

  delete() {
    return this._parse.destroy();
  }

  describe() {
   return Object.assign({ token: this.token, created: this.created }, this._parse.attributes);
  }
}

BaseModel._type = function() {
  return BaseModel.parseClient.Object.extend(this.typeName || this.name);
};

BaseModel._createQuery = function() {
  return new BaseModel.parseClient.Query(this._type());
};

BaseModel.generate = function(hash) {
  var T = this._type();
  var doc = new T();

  if (hash) {
    for (var key of Object.keys(hash)) {
      doc.set(key, hash[key]);
    }
  }

  return new Promise((resolve, reject) => {
    doc.save().then((data) => {
      resolve(new this(data));
    }, (err) => {
      reject(err);
    });
  });
};

BaseModel.load = function(token) {
  return new Promise((resolve, reject) => {
    this._createQuery().get(token).then((data) => {
      resolve(new this(data));
    }, (err) => {
      if (err.code === 101) {
        resolve(null);
      } else {
        reject(new Error(util.inspect(err)));
      }
    });
  });
};

BaseModel.loadOne = function(hash) {
  var query = this._createQuery();

  if (hash) {
    for (var key of Object.keys(hash)) {
      query.equalTo(key, hash[key]);
    }
  }

  return new Promise((resolve, reject) => {
    query.first().then((data) => {
      if (!data) {
        resolve(null);
      } else {
        resolve(new this(data));
      }
    }, (err) => {
      reject(new Error(err));
    });
  });
};

BaseModel.loadAll = function(hash, options) {
  var query = this._createQuery();

  if (hash) {
    for (var key of Object.keys(hash)) {
      query.equalTo(key, hash[key]);
    }
  }

  var opts = options || {};
  opts.limit = opts.limit || 1000;

  return new Promise((resolve, reject) => {
    query.limit(opts.limit).find().then((data) => {
      var output = [];
      for (var item of data) {
        output.push(new this(item));
      }

      resolve(output);
    }, (err) => {
      reject(new Error(err));
    });
  });
};

function initBaseModel(parseClient) {
  BaseModel.parseClient = parseClient;
  return BaseModel;
}

module.exports = initBaseModel;
