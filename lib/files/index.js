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

  self.createReadStream = function createReadStream (path) {
    var readStream = client.request('/files/createReadStream?path=' + path, { json: { path: path }, stream: true, method: "GET" });
    return readStream;
  };

  self.createWriteStream = function createWriteStream (path) {
    var writeStream = client.request('/files/createWriteStream?path=' + path, { json: { path: path }, stream: true });
    return writeStream;
  };

  self.upload = require('./upload');

  return self;

};