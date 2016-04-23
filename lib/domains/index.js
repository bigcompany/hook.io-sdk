// TODO: add additional domains methods

module['exports'] = function Domains (client) {
  var self = this;

  self.all = function (cb) {
    client.request('/domains', { json: true }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  return self;

};