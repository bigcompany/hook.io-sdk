var sdk = require("../");
var fs = require('fs');

var client = sdk.createClient({});

var readStream = client.files.createReadStream('index.html');
readStream.on('error', function(err){
  throw err;
})

readStream.pipe(process.stdout);