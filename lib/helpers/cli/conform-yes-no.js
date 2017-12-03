module.exports = function conform (val, cb) {
  var check = new RegExp(/y[es]*|n[o]?|1/i)
  if (check.test(val)) {
    if (/y(?:es)?|1/i.test(val)) {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  }
  return cb(new Error('yes or no answer required'));
}
