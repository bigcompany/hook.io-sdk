module['exports'] = function echoHttp (hook) {
  console.log("Console messages are sent to /logs");
  hook.res.json(hook.params);
};