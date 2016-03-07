var client = {};
module['exports'] = client;
client.createClient = function createClient (opts) {
  var c = new Client(opts);
  return c;
};

var request = require('request');

var DS = require('./lib/datastore');
var Hook = require('./lib/hook');

function Client (opts) {
  var self = this;

  self.host = opts.host || "hook.io";
  self.port = opts.port || 443;
  self.protocol = opts.protocol || "https";
  self.datastore = new DS(self);
  self.hook = new Hook(self);

  if (opts.hook_private_key) {
    self.hook_private_key = opts.hook_private_key;
    self.attemptAuth = true;
  }
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
  request(url, opts, cb);
};

Client.prototype.error = function (err, context, cb) {
  var self = this;
  err.message += JSON.stringify(self);
  cb(err);
};