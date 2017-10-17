var sdk = require("../");

var client = sdk.createClient({});

client.files.readdir('', function (err, dir, vinyl) {
  console.log(err, dir, vinyl);
});