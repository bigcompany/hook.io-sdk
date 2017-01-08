var env = "dev";

if (process.env.NODE_ENV === "production") {
  env = "production";
}
// env = "production";
module.exports = require('./' + env + '.json');
module.exports.location = require.resolve('./' + env + '.json');
module.exports.env = env;