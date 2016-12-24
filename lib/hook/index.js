var hyper = require('hyperquest');
var config = require('../../config');

module['exports'] = function Hook (client) {
  var self = this;

  // executes service source code against gateway
  // allows for running code without needing to create a service
  self.exec = function exec (opts, cb) {
    client.request('/gateway', { json: opts, method: "POST"}, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.run = function (opts, cb) {
    var data = opts.data;
    opts.method = opts.method || "POST";
    /*
    // simple arguments curry, has to take into account extended promise api ( adds additional method )
    if (typeof opts === "function") {
      cb = opts;
    }
    */
    if (opts.streaming) {
      //console.log('streaming request');
      var stream = client.request('/' + url, { stream: true });
      if (typeof data.body === "undefined") {
        console.log('cannot continue');
        process.exit();
      }
      stream.write(data.body);
      stream.pipe(opts.output);
      return stream;
    } else {
      //console.log('non streaming request');
      client.request('/' + opts.owner + "/" + opts.name, { json: data, method: opts.method }, function (err, res, body) {
        if (err) {
          return cb(err);
        }
        cb(null, body);
      });
    }
  };

  self.create = function (data, cb) {
    data.owner = data.owner || config.user;
    client.request('/new', { json: data, method: "POST" }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.update = function (data, cb) {
    client.request('/admin', { json: data, method: "POST" }, function (err, res, body){
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.destroy = function (opts, cb) {
    client.request("/" + opts.owner + '/' + opts.name + '/delete', { json: true, method: "POST" }, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.find = function hookFind (opts, cb) {
    client.request("/" + config.user , { json: { query: opts }, method: "POST" }, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };


  self.all = function hookAll (cb) {
    client.request("/" + config.user , { json: true, method: "GET" }, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  };

  self.get = function hookGet (opts, cb) {
    client.request("/" + opts.owner + "/" + opts.name + "/resource" , { json: true, method: "GET" }, function (err, res, body) {
      if (err) {
        return cb(err, res, body);
      }
      cb(null, body);
    });
  }

  self.source = function hookGet (opts, cb) {
    client.request("/" + opts.owner + "/" + opts.name + "/source" , { json: true, method: "GET" }, function (err, res, body) {
      if (err) {
        return cb(err);
      }
      cb(null, body);
    });
  }

  self.clone = require('./clone');
  self.deploy = require('./deploy');

  return self;

};