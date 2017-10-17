var sdk = require("../");

var client = sdk.createClient({});

client.hook.find({ owner: 'examples' }, function (err, res){
  console.log(err, res)
});