// TODO: add additional domains methods

module['exports'] = function Domains (client) {
  var self = this;

  self.all = function allDomains (cb) {
    client.request('/domains', { json: true }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.create = function createDomain (opts, cb) {
    client.request('/domains', { json: opts, method: "POST" }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  return self;

};