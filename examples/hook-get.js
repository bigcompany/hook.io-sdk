var sdk = require("../");

var client = sdk.createClient({});

client.hook.get({ "owner": "david", "name": "echo" }, function (err, res){
  console.log(err, res)
});