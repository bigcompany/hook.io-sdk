var sdk = require("../");

var client = sdk.createClient({});

client.logs.get({
  name: 'echo',
  owner: 'examples'
}, function (err, l){
  console.log(err, l)
});