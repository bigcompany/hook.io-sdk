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
  self.set = function (data, cb) {
    // TODO: modify hook.io/env to accept standard object versus keys / values array
    var keys = Object.keys(data);
    var values = [];
    keys.forEach(function(v){
      values.push(data[v]);
    });
    client.request('/env', { json: { key: keys, value: values },  method: "POST" }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  return self;

};