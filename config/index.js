var env = "dev";

var base = require('./index.json');

if (base.configEnv === 'dev') {
  env = "dev";
} else {
  env = "production";
}

if (process.env.NODE_ENV === "production") {
  env = "production";
}

module.exports = require('./' + env + '.json');
module.exports.location = require.resolve('./' + env + '.json');
module.exports.base = base;
module.exports.env = env;