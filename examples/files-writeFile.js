var sdk = require("../");

var client = sdk.createClient({});

client.files.writeFile('hello.txt', 'there', function (err, file) {
  console.log(err, file);
});