var helpers = {};
module.exports = helpers;

helpers.getLanguageFromPath = function getLanguageFromPath (p) {
  var path = require('path');
  var ext = path.extname(p);
};

helpers.extensions = {
  "babel": ".js",
  "bash": ".sh",
  "clisp": ".lisp",
  "coffee-script": ".coffee",
  "gcc": ".c",
  "go": ".go",
  "java": ".java",
  "javascript": ".js",
  "lua": ".lua",
  "ocaml": ".ml",
  "perl": ".pl",
  "php": ".php",
  "python": ".py", // Remark: You can also use the "--language python" option
  "python3": ".py3", // Remark: You can also use the "--language python3" option
  "r": ".r",
  "ruby": ".rb",
  "tcl": ".tcl",
  "scheme": ".ss",
  "smalltalk": ".st"
};