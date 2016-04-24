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
var Domains = require('./lib/domains');
var Env = require('./lib/env');
var Events = require('./lib/events');
var Files = require('./lib/files');
var Hook = require('./lib/hook');
var Keys = require('./lib/keys');
var Logs = require('./lib/logs');
var config = require('./config');

function Client (opts) {
  var self = this;

  self.host = opts.host || config.host || "hook.io";
  self.port = opts.port || config.port || 443;
  self.protocol = opts.protocol || config.protocol || "https";
  self.datastore = new DS(self);
  self.env = new Env(self);
  self.events = new Events(self);
  self.files = new Files(self);
  self.hook = new Hook(self);
  self.keys = new Keys(self);
  self.logs = new Logs(self);
  self.domains = new Domains(self);

  if (config.accessKey) {
    self.hook_private_key = config.accessKey;
    self.attemptAuth = true;
  }
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
  extendWithPromiseApi(self.domains);
  extendWithPromiseApi(self.env);
  extendWithPromiseApi(self.events);
  extendWithPromiseApi(self.files);
  extendWithPromiseApi(self.hook);
  extendWithPromiseApi(self.keys);
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
    opts.json.hook_private_key = opts.json.hook_private_key || self.hook_private_key;
  }
  if (opts.stream === true) {
    return hyper(url + "?streaming=true", { headers: { "hookio-private-key": self.hook_private_key }});
  } else {
    request(url, opts, cb);
  }
};

Client.prototype.error = function (err, context, cb) {
  var self = this;
  err.message += JSON.stringify(self);
  cb(err);
};