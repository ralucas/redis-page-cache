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

  redisPageCache(client, 'myUniqueKey', 'path/to/file', function(err, html) {
    if (err) {
      //handle error
    } else {
      res.send(html);  
    }
  });
  
});
```

