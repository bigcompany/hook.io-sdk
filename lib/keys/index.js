module['exports'] = function Keys (client) {
  var self = this;

  self.checkAccess = function checkAccess (data, cb) {
    client.request('/keys/checkAccess', { method: "POST", json: data }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.create = function create (data, cb) {
    client.request('/keys/create', { json: data, method: "POST" }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.destroy = function destroy (data, cb) {
    client.request('/keys/destroy', { json: data, method: "POST" }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.all = function all (cb) {
    client.request('/keys/all', { json: {}, method: "POST" }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  return self;

};