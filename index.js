var client = {};
module['exports'] = client;
client.createClient = function createClient (opts) {
  var c = new Client(opts);
  return c;
};

var request = require('request');
var hyper = require('hyperquest');
var thenify = require('thenify');

var DS = require('./lib/datastore');
var Hook = require('./lib/hook');
var Logs = require('./lib/logs');

function Client (opts) {
  var self = this;

  self.host = opts.host || "hook.io";
  self.port = opts.port || 443;
  self.protocol = opts.protocol || "https";
  self.datastore = new DS(self);
  self.hook = new Hook(self);
  self.logs = new Logs(self);

  if (opts.hook_private_key) {
    self.hook_private_key = opts.hook_private_key;
    self.attemptAuth = true;
  }

  // extends all core sdk methods with ES6 Promise API
  // should be non-instrusive and not affect Callback API...
  function extendWithPromiseApi (obj) {
    for (var p in obj) {
      if (typeof obj[p] === "function") {
        obj[p] = thenify(obj[p]);
      }
    }
  }

  //extendWithPromiseApi(self);
  extendWithPromiseApi(self.datastore);
  extendWithPromiseApi(self.hook);
  extendWithPromiseApi(self.logs);
  return self;
};

Client.prototype.request = function (url, opts, cb) {
  var self = this;
  url =  self.protocol + "://" + self.host + ":" + self.port + url;
  if (self.attemptAuth === true) {
    opts.json = opts.json || {};
    if (opts.json === true) {
      opts.json = {};
    }
    opts.json.hook_private_key = self.hook_private_key;
  }
  // console.log('making request', url, opts)
  if (opts.stream === true) {
    return hyper(url);
  } else {
    request(url, opts, cb);
  }
};

Client.prototype.error = function (err, context, cb) {
  var self = this;
  err.message += JSON.stringify(self);
  cb(err);
};