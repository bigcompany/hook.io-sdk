var sdk = require("../");

var client = sdk.createClient({});

client.hook.get({ "owner": "examples", "name": "echo" }, function (err, res){
  console.log(err, res)
});