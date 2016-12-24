var log = function (file, cb) {
  console.log('log', file.path);
  console.log(file.contents)
  setTimeout(function(){
    cb(null, file);
  }, 1500);
};

module['exports'] = function FilesUpload (path, complete) {
  var fs = require('fs');
  var vfs = require('vinyl-fs');
  var map = require('map-stream');
  var vfs = require('vinyl-fs');
  var through2Concurrent = require('through2-concurrent');
  var self = this;
  console.log('uploading files');
  var opts = {};
  // simple arguments curry
  if (typeof path === "string") {
    opts.localPath = path;
    opts.targetPath = "";
  } else {
    opts = path;
  }
  
  if (typeof opts.targetPath === "undefined") {
    opts.targetPath = "";
  }

  // TODO: better stat with glob support / remove stat?
  var stat;
  var uploadFile = function uploadFile (file, cb) {
    console.log('uploadFile', file.path);
    console.log('contents', file.contents);
    if (file.contents === null) {
      return cb(null);
    }
    // TODO: switch to streaming API to reduce in-memory RAM usage
    /*
    var writeStream = self.createWriteStream(opts.targetPath + file.relative);
    writeStream.on('error', function(err){
      console.log('WARNING: write stream error in file uploads');
      cb(err);
    });
    writeStream.write(file.contents.toString());
    writeStream.end();
    cb(null, 'uploaded');
    */
    /* Remark: old buffer based implementation, has been switched to above streaming ^^^ */
    
    self.writeFile(opts.targetPath + file.relative, file.contents.toString(), function (err, result) {
      console.log('writeFile cb', err, result)
      cb(err, result);
    });
  };

  try {
    stat = fs.statSync(opts.localPath);
  } catch (err) {
    return complete(err);
  }

  if (stat.isDirectory() === false) {
    // check if we are dealing with directory or file
    // if file, simply call Files.writeFile on the single file
    // TODO: self.writeFile
    console.log('uploading single file using self.writeFile');
  } else {
    // if directory, need to perform complex upload using diff and concurrency
    // TODO: implement dir file read
    // TODO: implement diff
    // TODO: implement concurrency
      // TODO: call self.writeFile
    console.log('uploading directory using multiple self.writeFile');
      
    vfs.src(opts.localPath + "/**")
    .pipe(through2Concurrent.obj(
       { maxConcurrency: 8 },
       function (chunk, enc, callback) {
         var self = this;
         
         uploadFile(chunk, function (newChunk) {
           self.push(newChunk);
           callback();
         });
         /*
         log(chunk, function (newChunk) {
           self.push(newChunk);
           callback();
         });
         */
     }))
     .on('data', function (data) {
       console.log('got data', data)
       //all.push(data)
     })
     .on('end', function () {
       console.log('through stream ended');
       //doSomethingSpecial(all)
     })
    .pipe(map(log))
  }

  return self;
}