var sdk = require("../");

var client = sdk.createClient({});

client.events.get('marak', function (err, l){
  console.log(err, l)
});