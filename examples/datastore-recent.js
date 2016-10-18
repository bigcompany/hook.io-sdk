var sdk = require("../");

var client = sdk.createClient({});

client.datastore.recent(function (err, d){
  console.log(err, d)
});