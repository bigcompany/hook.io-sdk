process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

var config = {};
config = require('./dev');
module['exports'] = config;

//config = require('./production');