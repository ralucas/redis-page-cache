var fs = require('fs');
var md5 = require('crypto').createHash('md5');

module.exports = function(client, key, file) {
  var hash;

  return function() {
    if (!hash) {
      md5.update(key, 'utf8');
      hash = md5.digest('hex');
    }
   
    client.exists(key, function(err, r) {
      if (err) throw new Error(err);
      if (r !== 0) {
        client.get(hash, function(err, contents) {
          if (err) throw new Error(err); 
          return contents;
        });
      } else {
        fs.readFile(file, function(err, contents) {
          if (err) throw new Error(err); 
          var output = contents.toString();
          client.set(key, output);  
          return output;
        });
      }
    });
  };
};
