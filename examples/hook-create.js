var sdk = require("../");

var client = sdk.createClient({});

client.hook.create({ "name": 'echo', "source": 'echo "hello"', "language": "bash" }, function (err, res){
  console.log(err, res)
});