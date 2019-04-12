var sdk = require("../");

var client = sdk.createClient({});

client.cron.create({
  name: "test-cron",
  uri: 'https://hook.io/examples/hello-world'
}, function (err, res) {
  console.log(err);
  console.log(res);
});
