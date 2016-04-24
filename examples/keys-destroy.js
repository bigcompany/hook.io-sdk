var sdk = require("../");

var client = sdk.createClient({});

client.keys.destroy({
  name: "test-access-key"
}, function (err, e) {
  console.log(err, e);
});
