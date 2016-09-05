var sdk = require("../");

var client = sdk.createClient({});

client.hook.run({ owner: "david", name: "echo", method: "POST", data:  { "foo": "bar" } }, function (err, res){
  console.log(err, res)
});