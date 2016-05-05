var sdk = require("../");

var client = sdk.createClient({});

client.files.readdir('hookio-vfs', function (err, file) {
  console.log(err, file);
});