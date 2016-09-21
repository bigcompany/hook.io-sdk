module['exports'] = function Env (client) {
  var self = this;

  self.get = function (cb) {
    client.request('/env', { json: true }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  // performs update on any new keys or changed keys
  // will not delete keys, only create or update them
  // to delete a key, you must sets its value to null
  self.set = function (data, cb) {
    client.request('/env', { json: { env: data },  method: "POST" }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  return self;

};