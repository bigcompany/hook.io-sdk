var sdk = require("../");

var client = sdk.createClient({});

client.keys.all(function (err, e) {
  console.log(err, e);
});