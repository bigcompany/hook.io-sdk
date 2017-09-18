var config = require('../../config');

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

var helpers = require('../helpers');
var extensions = helpers.extensions;

// TODO: add default scaffold values for new services
function resourceToFiles (path, resource, cb) {
  var fs = require('fs');
  var mkdirp = require('mkdirp');
  var ext = extensions[resource.language];
  // create directory for cloned service ( if it doesnt exist )
  // TODO: ensure all properties are copies from cloud version
  resource.pkg = resource.pkg || {
    name: resource.name,
    version: "1.0.0", // TODO: resource.version instead
    description: "this is the description",
    main: "index" + ext, // TODO: dynamic input type on language
    scripts: {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "microcule index" + ext
    },
    author: config.user, // TODO: switch to config local user or remove for API key
    dependencies: {
      "microcule": "*"
    },
    license: "MIT"
  };
  // cloned package should be owned by current user
  resource.pkg.author = config.user;
  // console.log(resource);
  // TODO: move create service code into seperate module

  // check to to see if the path we are attempting to write to doesn't exist,
  // if it exists, throw error and don't allow overwriting of directory
  var stat;

  try {
    stat = fs.statSync(path);
  } catch (err) {
  }

  if (stat) {
    throw new Error(path + ' already exist. aborting.');
  }

  return mkdirp(path, function(err, result){
    // write package.json
    fs.writeFile(path + '/package.json', JSON.stringify(resource.pkg, true, 2), function (err, stat) {
      if (err) {
        return cb(err);
      }
      // write source code
      fs.writeFile(path + '/index' + ext, resource.source, function (err, stat) {
        if (err) {
          return cb(err);
        }

        if (resource.themeSource) {
          // write service schema file
          fs.writeFileSync(path + "/view.html", resource.themeSource);
          // write service view file
        }

        if (resource.mschema) {
          fs.writeFileSync(path + "/schema.js", 'module.exports = ' + JSON.stringify(resource.mschema, true, 2));
        }

        if (resource.presenterSource) {
          fs.writeFileSync(path + "/presenter.js", 'module.exports = ' + resource.presenterSource);
        }

        cb(err, result);

      });
    });
  });

}