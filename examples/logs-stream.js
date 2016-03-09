var sdk = require("../");

var client = sdk.createClient({});

client.logs.stream('marak/echo', process.stdout);