var sdk = require("../");

var client = sdk.createClient({});

client.keys.checkAccess({
  role: "hook::run"
}, function (err, e) {
  console.log(err, e);
});

client.keys.checkAccess({
  hook_private_key: "invalid-key",
  role: "hook::run"
}, function (err, e) {
  console.log(err, e);
});
