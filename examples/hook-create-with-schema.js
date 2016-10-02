var sdk = require("../");

var client = sdk.createClient({});

client.hook.create({ 
  "name": 'schema-hook', 
  "source": 'echo "hello"', 
  "language": "bash",
  "schema": {
    "param1": {
      "type": "string",
      "default": "foo"
    },
    "param2": {
      "type": "string",
      "required": true
    }
  }
}, function (err, res) {
  console.log(err, res);
});