var sdk = require("../");

var client = sdk.createClient({});

client.events.stream('marak', process.stdout);