var sdk = require("../");

var client = sdk.createClient({});

client.files.removeFile('hello.txt', function (err, file) {
  console.log(err, file);
});