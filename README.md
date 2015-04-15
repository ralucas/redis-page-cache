Redis Page Cache Module
---

###Installation:
`npm install redis-page-cache`

Requires a redis client

###Example:

```javascript
var redis = require('redis');
var redisPageCache = require('redis-page-cache');

var client = redis.createClient();
...

app.get('/test', function(req, res) {

  var page = redisPageCache(client, 'myUniqueKey', 'path/to/file');
  
  res.send(page);  

});
```

