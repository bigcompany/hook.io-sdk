module['exports'] = function Hook (client) {
  var self = this;

  // TODO
  self.run = function (url, data, cb) {
    client.request('/' + url, { json: data }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  // TODO: create, destroy, update

  return self;

};