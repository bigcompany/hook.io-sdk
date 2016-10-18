var sdk = require("../");

var client = sdk.createClient({});

client.logs.get('examples/echo', function (err, l){
  console.log(err, l)
});