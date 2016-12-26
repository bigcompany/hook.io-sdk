var sdk = require("../");
var fs = require('fs');

var client = sdk.createClient({});

var writeStream = client.files.createWriteStream('new-remote-file.html');

writeStream.on('error', function(err){
  throw err;
})
writeStream.on('end', function(err){
  console.log('write stream ended')
})

writeStream.on('response', function(a, b, c){
  console.log('write stream response', b, c)
})

writeStream.on('data', function(d){
  console.log('write stream data', d.toString())
})

writeStream.write('hello!');
writeStream.end();