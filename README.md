Redis Page Cache Module
---

###Installation:
`npm install redis-page-cache`

Requires a redis client

###Example:
Using express

```javascript
var redis = require('redis');
var redisPageCache = require('redis-page-cache');

var client = redis.createClient();
...

app.get('/test', function(req, res) {

  var options = {
    client: client,
    key: 'myUniqueKey',
    file: 'path/to/file'
  };

  redisPageCache(options, function(err, html) {
    if (err) {
      //handle error
    } else {
      res.send(html);  
    }
  });
  
});
```

