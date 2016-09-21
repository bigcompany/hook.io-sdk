var sdk = require("../");

var client = sdk.createClient({});

client.hook.update('echo', {
  "source": 'echo "hello"',
  "language": "bash",
  "view": "This is the view {{hook.output}}"
}, function (err, res) {
  console.log(err, res);
});