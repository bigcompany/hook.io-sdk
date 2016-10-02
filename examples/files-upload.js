var sdk = require("../");

var client = sdk.createClient({});

// uses default path ( which is root )
/*
client.files.upload('./test/fixtures/files/bobby/', function (err, result) {
  console.log(err, result);
});
*/

// uses options config with custom upload target path
client.files.upload({
  localPath: './test/fixtures/files/bobby/',
  targetPath: 'testing4/'
}, function (err, result) {
  console.log(err, result);
});
