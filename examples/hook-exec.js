var sdk = require("../");

var client = sdk.createClient({});

client.hook.exec({ 
  "code": "module.exports = function (service){return service.res.json(service.params);}",
  "language": "javascript",
  "data": { "foo": "bar" }
 }, function (err, res){
  console.log(err, res)
});

client.hook.exec({ "code": 'echo "hello"', "language": "bash", "data":  { "foo": "bar" } }, function (err, res){
  console.log(err, res)
});