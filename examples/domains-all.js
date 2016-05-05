var sdk = require("../");

var client = sdk.createClient({});

client.domains.all(function (err, l){
  console.log(err, l)
});