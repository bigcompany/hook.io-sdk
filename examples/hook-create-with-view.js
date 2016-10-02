var sdk = require("../");

var client = sdk.createClient({});

client.hook.create({ 
  "name":'hook-with-view',
  "source": 'echo "hello"', 
  "language": "bash",
  "view": "This is the view {{hook.output}}"
}, function (err, res) {
  console.log(err, res);
});