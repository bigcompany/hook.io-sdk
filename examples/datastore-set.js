var sdk = require("../");

var client = sdk.createClient({});

client.datastore.set('sdk-test-key', 'hi', function (err, d){
  console.log(err, d)
});
