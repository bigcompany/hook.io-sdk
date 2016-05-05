var sdk = require("../");

var client = sdk.createClient({});

client.hook.run('david/echo', { "foo": "bar" }, function (err, res){
  console.log(err, res)
});