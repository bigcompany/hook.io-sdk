var sdk = require("../");

var client = sdk.createClient({});

client.hook.destroy('david/testt', function (err, res){
  console.log(err, res)
});