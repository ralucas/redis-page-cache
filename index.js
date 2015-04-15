var fs = require('fs');
var md5 = require('crypto').createHash('md5');

module.exports = function(client, key, file, callback) {
  var hash;

  return function() {
    if (!hash) {
      md5.update(key, 'utf8');
      hash = md5.digest('hex');
    }
   
    client.exists(hash, function(err, r) {
      if (err) callback(err);
      if (r !== 0) {
        client.get(hash, function(err, contents) {
          if (err) callback(err); 
          return callback && callback(null, contents);
        });
      } else {
        fs.readFile(file, function(err, contents) {
          if (err) callback(err); 
          var output = contents.toString();
          client.set(key, output);  
          return callback && callback(null, output);
        });
      }
    });
  }();

};
