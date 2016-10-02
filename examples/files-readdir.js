var sdk = require("../");

var client = sdk.createClient({});

client.files.readdir('', function (err, files) {
  console.log(err, files);
});