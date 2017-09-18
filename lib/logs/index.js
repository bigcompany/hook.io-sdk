module['exports'] = function Logs (client) {

  var self = this;

  self.get = function (opts, cb) {
    client.request('/' + opts.owner + '/' + opts.name + '/logs', { json: true, method: "GET" }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.stream = function (opts, output) {
    var stream = client.request('/' + opts.owner + '/' + opts.name +  '/logs?s=true', { stream: true, method: "GET" });
    stream.pipe(output);
  };

  // TODO: write logs
  return self;

};