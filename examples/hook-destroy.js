var sdk = require("../");

var client = sdk.createClient({});

client.hook.destroy({ owner: 'david', name: 'test' }, function (err, res){
  console.log(err, res)
});