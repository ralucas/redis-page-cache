var fs = require('fs');
var md5 = require('crypto').createHash('md5');

module.exports = function(opts, callback) {
  var client = opts.client;

  md5.update(opts.key, 'utf8');
  var hash = md5.digest('hex');
 
  client.exists(hash, function(err, r) {
    if (err) callback(err);
    if (r !== 0) {
      client.get(hash, function(err, contents) {
        if (err) callback(err); 
        return callback && callback(null, contents);
      });
    } else {
      fs.readFile(opts.file, 'utf-8', function(err, contents) {
        if (err) callback(err); 
        client.set(hash, contents);  
        return callback && callback(null, contents);
      });
    }
  });
};
