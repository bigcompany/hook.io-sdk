var fs = require('fs');
var mkdirp = require('mkdirp');

module['exports'] = function Pull (opts, cb) {
  var self = this;
  // grab source of the service
  self.get(opts, function (err, resource) {
    if (err) {
      return cb(err);
    }
    var path = process.cwd() + "/" + resource.name;
    // convert resource into files
    resourceToFiles(path, resource, cb)
  });
  return self;
}

// TODO: add default scaffold values for new services
function resourceToFiles (path, resource, cb) {
  // create directory for cloned service ( if it doesnt exist )
  resource.packageJSON = resource.packageJSON || {
    name: resource.name,
    version: "1.0.0",
    description: "this is the description",
    main: "index.js", // TODO: dynamic input type on language
    scripts: {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "stack index.js"
    },
    author: "david", // TODO: switch to config local user or remove for API key
    license: "MIT"
  };
  return mkdirp(path, function(err, result){
    // write package.json
    fs.writeFile(path + '/package.json', JSON.stringify(resource.packageJSON, true, 2), function (err, stat){
      if (err) {
        return cb(err);
      }
      // write source code
      fs.writeFile(path + '/index.js', resource.source, function (err, stat){
        if (err) {
          return cb(err);
        }
        cb(err, result);
      });
    });
  });
  // TODO: schema, view presenter

  // create directory for new service
  return;
  // write package.json
  fs.writeFile('./test/fixtures/geo/package.json', resource.packageJSON || '{ name: "geoip" }', function (err, stat){
    if (err) {
      return cb(err);
    }

    // write source code
    fs.writeFile('./test/fixtures/geo/index.js', resource.source, function (err, stat){
      if (err) {
        return cb(err);
      }

      // write schema
      fs.writeFile('./test/fixtures/geo/mschema.js', resource.mschema || "{}", function (err, stat){
        if (err) {
          return cb(err);
        }
        // write view
        fs.writeFile('./test/fixtures/geo/view.html', resource.themeSource || "", function (err, stat){
          if (err) {
            return cb(err);
          }
          // write presenter
          fs.writeFile('./test/fixtures/geo/presenter.js', resource.presenterSource || "", function (err, stat){
            if (err) {
              return cb(err);
            }
            return cb(null, 'complete');
          });
        });
      });
    });
  });

}