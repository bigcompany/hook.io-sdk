module.exports = function viewPresenter(opts, cb) {
    var $ = this.$;
    cb(null, $.html());
  }