var fs = require('fs');

module['exports'] = function Deploy (opts, cb) {
  var self = this;
  console.log(opts);
  
  // TODO: read package.json for properties and use them ( if they exist )
  
  // TODO: check directory for known files
  // package.json
  // mschema.js - optional - mschema of the service
  // view.html - optional - View of the service
  // presenter.js - optional - View Presenter of the service
  
  // scan directory for potential app, if app is found attempt to create new hook with index.js as source
  fs.readFile(opts.path + "/index.js", function (err, file) {
    if (err) {
      return cb(err);
    }
    self.create('fraktur', { "source": file.toString(), "language": "javascript" }, function (err, res) {
      if (err) {
        return cb(err);
      } else {
        if (res.error === true && res.type === "duplicate-key") {
          // if the service already exists, then simply perform an update instead
          return self.update('example-service', { "source": "hello", "language": "javascript" }, function (err, res) {
            console.log('updated existing service');
            return cb(err, res);
          });
        } else {
          console.log('new service created')
          cb(null, res);
        }
      }
    });
  });
  return self;
}