var sdk = require("../");

var client = sdk.createClient({});

client.logs.stream({
  name: 'echo',
  owner: 'examples'
}, process.stdout);