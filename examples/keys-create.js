var sdk = require("../");

var client = sdk.createClient({});

client.keys.create({
  name: "test-access-key",
  roles: ["hook::run", "hook::create"]
}, function (err, e) {
  console.log(err, e);
});
