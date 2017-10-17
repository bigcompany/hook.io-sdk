module['exports'] = function Files (client) {
  var self = this;

  self.readFile = function readFile (path, cb) {
    client.request('/files/readFile', { method: "POST", json: { 
      path: path,
      vinyl: true
    } }, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      cb(null, body.contents, body);
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
    client.request('/files/readdir', { method: "POST", json: {
      path: path,
      vinyl: true
    } }, function (err, res, vinyl) {
      if (err) {
        return cb(err);
      }
      var dir = [];
      // convert date types back
      vinyl = vinyl.map(function(d){
        d.ctime = new Date(d.ctime);
        d.mtime = new Date(d.mtime);
        dir.push(d.basename);
        return d
      })
      cb(null, dir, vinyl);
    });
  };

  self.stat = function stat (path, cb) {
    client.request('/files/stat', { method: "POST", json: { path: path } }, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      if (typeof body === 'object') {
        // TODO: unify stat object creation
        body.isDirectory = function () {
          return false;
        }
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

  // download is like readFile, but is able to download an entire remote directory by path to local
  self.download = require('./download');

  // upload is like writeFile, but is able to upload an entire local directory by path to remote
  self.upload = require('./upload');

  return self;

};