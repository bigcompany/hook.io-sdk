var helpers = {};
module.exports = helpers;

helpers.getLanguageFromPath = function getLanguageFromPath (p) {
  var path = require('path');
  var ext = path.extname(p);
};

helpers.getExtensionFromLanguage = function getExtensionFromLanguage (language) {
  return helpers.extensions[language];
};

helpers.extensions = {
  ".js": "javascript",
  ".coffee": "coffee-script",
  ".lua": "lua",
  ".php": "php",
  ".pl": "perl",
  ".py": "python", // Remark: You can also use the "--language python" option
  ".py3": "python3", // Remark: You can also use the "--language python3" option
  ".sh": "bash",
  ".rb": "ruby",
  ".tcl": "tcl",
  ".ss": "scheme",
  ".st": "smalltalk",
  "babel": ".js",
  "javascript": ".js",
  ".coffee": "coffee-script",
  ".lua": "lua",
  ".php": "php",
  "perl": ".pl",
  ".py": "python", // Remark: You can also use the "--language python" option
  ".py3": "python3", // Remark: You can also use the "--language python3" option
  "bash": ".sh",
  ".rb": "ruby",
  ".tcl": "tcl",
  ".ss": "scheme",
  ".st": "smalltalk"
};