var sdk = require("../");

var client = sdk.createClient({});

client.hook.all(function (err, res){
  console.log(err, res)
});