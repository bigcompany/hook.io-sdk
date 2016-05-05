var sdk = require("../");

var client = sdk.createClient({});

client.env.set({ "a": "1", "b": null },function (err, e){
  console.log(err, e);
});