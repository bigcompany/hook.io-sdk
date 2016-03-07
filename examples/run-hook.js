var sdk = require("../");

var client = sdk.createClient({});

client.hook.run('marak/echo', { "foo": "bar" }, function (err, res){
  console.log(err, res)
});