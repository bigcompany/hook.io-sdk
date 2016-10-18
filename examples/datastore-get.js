var sdk = require("../");

var client = sdk.createClient({});

client.datastore.get('sdk-test-key', function (err, d){
  console.log(err, d)
});