module['exports'] = function Files (client) {
  var self = this;

  self.readFile = function readFile (path, cb) {
    client.request('/files/readFile', { method: "POST", json: { path: path } }, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  return self;

};