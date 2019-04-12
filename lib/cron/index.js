var config = require(__dirname + '/../../config');

module['exports'] = function Crons (client) {
  var self = this;

  self.create = function create (data, cb) {
    client.request('/cron/new', { json: data, method: "POST" }, function (err, res, body) {
      if (err) {
        return cb(err, body);
      }
      cb(null, body);
    });
  };

  self.update = function create (data, cb) {
    client.request('/cron/admin', { json: data, method: "POST" }, function (err, res, body) {
      if (err) {
        return cb(err, body);
      }
      cb(null, body);
    });
  };

  self.destroy = function destroy (data, cb) {
    if (typeof data.owner === 'undefined') {
      data.owner = config.user;
    }
    client.request('/cron/' + data.owner + '/' + data.name + '/destroy', { json: data, method: "POST" }, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.all = function all (data, cb) {
    if (typeof data === 'function') {
      cb = data;
      data = {};
    }
    client.request('/cron/all', { json: data, method: "GET" }, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.get = function get (data, cb) {
    client.request('/cron/' + data.owner + '/' + data.name , { json: {}, method: "GET" }, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  return self;

};