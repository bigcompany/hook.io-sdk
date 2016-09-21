var sdk = require("../");

var client = sdk.createClient({});

// Note: To delete an existing value, simply set it to null
client.env.set({ "a": "1", "b": null, "c": { "foo": "bar" } },function (err, e){
  console.log(err, e);
});