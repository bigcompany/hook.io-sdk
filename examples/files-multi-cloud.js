var sdk = require("../");

// adds custom configuration to files using your own connection strings
var client = sdk.createClient({
  files: {
    adapter: "sftp",
    host: "example.com",
    port: 22,
    username: "root",
    password: null,
    privateKey: "private key goes here as string"
  }
});

client.files.writeFile('hello.txt', 'new content', function (err, file) {
  console.log(err, file);
});

return;
client.files.readFile('hello.txt', function (err, file) {
  console.log(err, file);
});