var sdk = require("../");

var client = sdk.createClient({});

client.files.stat('hello.txt', function (err, file) {
  console.log(err, file);
});