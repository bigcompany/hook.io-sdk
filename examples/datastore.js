var sdk = require("../");

var client = sdk.createClient({});

client.datastore.set('sdk-test-key', 'hello', function (err, d){
  console.log(err, d)
  client.datastore.get('sdk-test-key', function (err, d){
    console.log(err, d)
  })
})
