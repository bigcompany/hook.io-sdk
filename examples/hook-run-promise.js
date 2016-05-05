var sdk = require("../");

var client = sdk.createClient({ promises: true });

client.hook.run('marak/echo', { "foo": "bar" }).then(function (res){
  console.log(res)
}, function(err){
  console.log('error', err)
});