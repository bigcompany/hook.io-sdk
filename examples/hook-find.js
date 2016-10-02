var sdk = require("../");

var client = sdk.createClient({});

client.hook.find({ owner: 'david', language: "bash" }, function (err, res){
  console.log(err, res)
});