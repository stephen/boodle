var co = require('co');

var Helpers = {
  TEST_APP_ID: 'fKMfPZ71QtzJXNt0TIj59iJUxp0tYfWWhbUBNZpe',
  TEST_JS_KEY: 'DjvCHMAIc466NxOJZbJAs5AfJibJZrhCWW1WDHNc'
};

Helpers.coIt = function(name, generator) {
  it(name, (cb) => {

    co(generator).then(() => {
      cb();
    });

  });
};

Helpers.coIt.skip = it.skip;
Helpers.coIt.only = it.only;

module.exports = Helpers;
