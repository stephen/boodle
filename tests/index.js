require('source-map-support').install();

var Mocha = require('mocha');
var fs = require('fs');
var path = require('path');
var walk = require('walk');

var mocha = new Mocha({
    reporter: 'list'
});

var walker = walk.walk(__dirname);

walker.on('file', (root, fileStats, next) => {
  if (fileStats.name.substr(-8) === '.spec.js') {
    mocha.addFile(path.join(root, fileStats.name));
  }

  next();
});

walker.on('end', () => {
  mocha.run((failures) => {
    process.exit(failures);
  });
});
