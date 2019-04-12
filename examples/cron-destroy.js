var sdk = require("../");

var client = sdk.createClient({});

client.cron.destroy({
  name: "test-cron"
}, function (err, e) {
  console.log(err, e);
});
