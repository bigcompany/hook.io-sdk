var sdk = require("../");

var client = sdk.createClient({ promises: true });

client.hook.run({ owner: "examples", name: "echo", method: "POST", data:  { "foo": "bar" } }).then(function (res){
  console.log(res)
}, function(err){
  console.log('error', err)
});