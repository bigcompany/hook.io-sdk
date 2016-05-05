var sdk = require("../");

var client = sdk.createClient({});

client.files.readFile('hello.txt', function (err, file) {
  console.log(err, file);
});