var sdk = require("../");

var client = sdk.createClient({});

client.hook.update('echo', { "source": 'echo "goodbye"', "language": "bash" }, function (err, res) {
  console.log(err, res)
});