var sdk = require("../");

var client = sdk.createClient({});

client.cron.all(function (err, e) {
  console.log(err, e);
});