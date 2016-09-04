var fs = require('fs');

module['exports'] = function Deploy (opts, cb) {

  var self = this;
  //
  // scan directory for potential app, if app is found attempt to create new hook with index.js as source
  // package.json
  // mschema.js - optional - mschema of the service
  // view.html - optional - View of the service
  // presenter.js - optional - View Presenter of the service
  // read package.json for properties and use them ( if they exist )
  return fs.readFile(opts.path + "/package.json", function (err, file) {
    if (err) {
      return cb(err);
    }
    var pkg = JSON.parse(file.toString());

    if (typeof pkg.name === "undefined" || pkg.name.length === 0) {
      return cb(new Error('package.json is missing name property'))
    }

    if (typeof pkg.main === "undefined" || pkg.main.length === 0) {
      return cb(new Error('package.json is missing main property'))
    }

    if (typeof pkg.author === "undefined" || pkg.author.length === 0) {
      return cb(new Error('package.json is missing author property'))
    }

    fs.readFile(opts.path + "/" + pkg.main, function (err, mainEntry) {
      if (err) {
        return cb(err);
      }
      pkg.source = mainEntry.toString();
      // TODO: detect language / set language
      pkg.language = "javascript";
      pkg.owner = pkg.author;
      self.get({ name: pkg.name, owner: pkg.author }, function (err, _hook){
        if (err) {
          return cb(err);
        }
        if (typeof _hook !== "object") {
          // could not find existing hook service with this name,
          // attempt to create new service
          // TODO: _create();
          _create(pkg, function (err, _service){
            if (err) {
              return cb(err);
            }
            cb(null, _service);
          });
        } else {
          _update(pkg, function (err, _service){
            if (err) {
              return cb(err);
            }
            cb(null, _service);
          });
        }
      });
    });
  });

  function _create (pkg, cb) {
    self.create(pkg, function (err, _created){
      cb(err, _created);
    });
  };
  function _update (pkg, cb) {
    self.update(pkg, function (err, _updated){
      cb(err, _updated);
    });
  };

  return self;
}