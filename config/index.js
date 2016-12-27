process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

var config = {};
//config = require('./dev/index.json');
config = require('./production/index.json');
module['exports'] = config;

