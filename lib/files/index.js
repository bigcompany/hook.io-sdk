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

  self.writeFile = function writeFile (path, contents, cb) {
    client.request('/files/writeFile', { method: "POST", json: { path: path, contents: contents } }, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.removeFile = function removeFile (path, cb) {
    client.request('/files/removeFile', { method: "POST", json: { path: path } }, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.readdir = function readdir (path, cb) {
    client.request('/files/readdir', { method: "POST", json: { path: path } }, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.stat = function stat (path, cb) {
    client.request('/files/stat', { method: "POST", json: { path: path } }, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  return self;

};