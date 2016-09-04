var sdk = require("../");

var client = sdk.createClient({});

client.hook.run({ owner: "david", name: "echo", data:  { "foo": "bar" } }, function (err, res){
  console.log(err, res)
});