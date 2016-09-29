var fs = require('fs');
var requireServiceSync = require('stackvana').requireServiceSync;

module['exports'] = function Deploy (opts, cb) {

  var self = this;
  //
  // scan directory for potential app, if app is found attempt to create new hook with index.js as source
  // package.json
  // mschema.js - optional - mschema of the service
  // view.html - optional - View of the service
  // presenter.js - optional - View Presenter of the service
  // read package.json for properties and use them ( if they exist )
  var pkg, e = null;
  try {
    pkg = requireServiceSync({ path: opts.path });
  } catch (err){
    e = err;
  }
  self.get({ name: pkg.name, owner: pkg.owner }, function (err, _hook){
    if (err) {
      //      return cb(err);
    }
    if (err) {
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