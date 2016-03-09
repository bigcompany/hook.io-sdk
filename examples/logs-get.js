var sdk = require("../");

var client = sdk.createClient({});

client.logs.get('marak/echo', function (err, l){
  console.log(err, l)
});