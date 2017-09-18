var client = {};
client.version = "3.2.0";
module['exports'] = client;

client.createClient = function createClient (opts) {
  var c = new Client(opts);
  return c;
};

var thenify;

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
  opts = opts || {};
  self.host = opts.host || config.host || "hook.io";
  self.port = opts.port || config.port || 443;
  self.protocol = opts.protocol || config.protocol || "https";

  self.additionalRequestParams = {};

  if (opts.files) {
    self.additionalRequestParams.files = opts.files;
  }

  // set allowUnauthorizedTLS option to true for local testing with unauthorized / local SSL certificates
  if (opts.allowUnauthorizedTLS === true) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
  }

  self.datastore = new DS(self);
  self.env = new Env(self);
  self.events = new Events(self);
  self.files = new Files(self);
  self.hook = new Hook(self);
  self.keys = new Keys(self);
  self.logs = new Logs(self);
  self.domains = new Domains(self);

  if (config.hook_private_key) {
    self.hook_private_key = config.hook_private_key;
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

  if (opts.promises === true) {
    thenify = require('thenify');
    extendWithPromiseApi(self.datastore);
    extendWithPromiseApi(self.domains);
    extendWithPromiseApi(self.env);
    extendWithPromiseApi(self.events);
    extendWithPromiseApi(self.files);
    extendWithPromiseApi(self.hook);
    extendWithPromiseApi(self.keys);
    extendWithPromiseApi(self.logs);
    // leave out core API methods
    // extendWithPromiseApi(self);
  }

  return self;
};

Client.prototype.request = function (url, opts, cb) {
  var self = this;
  url =  self.protocol + self.host + ":" + self.port + url;
  
  opts.json = opts.json || {};
  if (self.attemptAuth === true) {
    if (opts.json === true) {
      opts.json = {};
    }
    opts.json.hook_private_key = opts.json.hook_private_key || self.hook_private_key;
  }

  // console.log('making request', url, opts, typeof cb)

  // TODO: add ability to extend other endpoints besides files
  if (self.additionalRequestParams && typeof self.additionalRequestParams.files === "object") {
    for (var k in self.additionalRequestParams.files) {
      opts.json[k] = self.additionalRequestParams.files[k];
    }
  }

  opts.headers = opts.headers || {};
  opts.headers["hookio-private-key"] = self.hook_private_key;

  if (opts.stream === true) {
    var hyper = require('hyperquest');
    var _url = url;
    opts.method = opts.method || "POST";
    var stream = hyper(_url, { method: opts.method, headers: opts.headers });
    return stream;
  } else {
    var request = require('request');
    // set max concurrency for requests to host
    // Note: We could use Infinity value as default, but we will assume most users won't need to create so many concurrency connections
    request.defaults({
      pool: { maxSockets: 10 }
    })
    request(url, opts, function (err, res, body){
      if (err) {
        return cb(err);
      }
      if (res.statusCode === 404) {
        return cb(new Error('Could not find requested URI: ' + url), res, body)
      }
      cb(err, res, body);
    });
  }

};

Client.prototype.error = function (err, context, cb) {
  var self = this;
  err.message += JSON.stringify(self);
  cb(err);
};