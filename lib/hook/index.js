var hyper = require('hyperquest');

module['exports'] = function Hook (client) {
  var self = this;

  self.run = function (url, data, opts, cb) {
    if (opts.streaming) {
      //console.log('streaming request');
      var stream = client.request('/' + url, { stream: true });
      stream.write(data.body);
      stream.pipe(opts.output);
      return stream;
    } else {
      // console.log('non streaming request');
      client.request('/' + url, { json: data }, function (err, res, body){
        if (err) {
          return cb(err);
        }
        cb(null, body);
      });
    }
  };

  self.create = function (name, data, cb) {
    data.name = name;
    client.request('/new', { json: data, method: "POST" }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.update = function (name, data, cb) {
    data.name = name;
    client.request('/admin', { json: data, method: "POST" }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  // TODO
  /*
  self.destroy = function (name, data, cb) {
    data.name = name;
    client.request('/admin', { json: data, method: "POST" }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };
  */


  // TODO: create, destroy, update

  return self;

};