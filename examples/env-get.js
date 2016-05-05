var sdk = require("../");

var client = sdk.createClient({});

client.env.get(function (err, e){
  console.log(err, e);
});