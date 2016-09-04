var fs = require('fs');

module['exports'] = function Pull (opts, cb) {
  var self = this;

  // grab source of the service
  self.get(opts, function (err, resource) {
    if (err) {
      return cb(err);
    }
    console.log('got resource', resource);
    
    // convert resource into files
    resourceToFiles(resource, cb)
    // write source to local directory
    //cb(null, resource);
    /*
    fs.writeFile('./testService.js', src, function(err, stat){
      return cb(err, stat);
    });
    */
    
  });

  return self;

}

// TODO: add default scaffold values for new services
function resourceToFiles (resource, cb) {

  // write package.json
  fs.writeFile('./test/fixtures/geo/package.json', resource.packageJSON || '{ name: "geoip" }', function (err, stat){
    if (err) {
      return cb(err);
    }

    // write source code
    fs.writeFile('./test/fixtures/geo/index.js', resource.source, function (err, stat){
      if (err) {
        return cb(err);
      }

      // write schema
      fs.writeFile('./test/fixtures/geo/mschema.js', resource.mschema || "{}", function (err, stat){
        if (err) {
          return cb(err);
        }
        // write view
        fs.writeFile('./test/fixtures/geo/view.html', resource.themeSource || "", function (err, stat){
          if (err) {
            return cb(err);
          }
          // write presenter
          fs.writeFile('./test/fixtures/geo/presenter.js', resource.presenterSource || "", function (err, stat){
            if (err) {
              return cb(err);
            }
            return cb(null, 'complete');
          });
        });
      });
    });
  });
  
}