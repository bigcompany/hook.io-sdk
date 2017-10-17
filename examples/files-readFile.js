var sdk = require("../");

var client = sdk.createClient({});

client.files.readFile('hello.txt', function (err, file, vinyl) {
  console.log(err, file, vinyl);
});