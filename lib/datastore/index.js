module['exports'] = function Datastore (client) {
  var self = this;

  self.get = function (key, cb) {
    client.request('/datastore/get?key=' + key, { json: true },function(err, res, body){
      if (err) {
        return client.error(err, 'datastore.get', cb);
      }
      cb(null, body);
    })
  };

  self.set = function (key, value, cb) {
    client.request('/datastore/set', { method: "POST", json: { key: key, value: value } }, function (err, res, body){
      if (err) {
        return client.error(err, 'datastore.set', cb);
      }
      cb(null, body);
    })
  };

  // TODO: del / recent

  return self;

};