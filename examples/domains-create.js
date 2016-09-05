var sdk = require("../");

var client = sdk.createClient({});

client.domains.create({
  name: "foo-bar2.com",
  forwardUrl: "/marak/echos"
}, function (err, l){
  console.log(err, l)
});