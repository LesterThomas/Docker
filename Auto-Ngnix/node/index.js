var express = require('express'),
    http = require('http'),
    redis = require('redis');

var app = express();

//console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);
// APPROACH 1: Using environment variables created by Docker
// var client = redis.createClient(
// 	process.env.REDIS_PORT_6379_TCP_PORT,
//   	process.env.REDIS_PORT_6379_TCP_ADDR
// );

// APPROACH 2: Using host entries created by Docker in /etc/hosts (RECOMMENDED)
var client = redis.createClient('6379', 'redis');

var thisServer=0;

client.incr('serverCounter', function(err, serverCounter) {
	thisServer=serverCounter;
});


app.get('/', function(req, res, next) {
  client.incr('counter', function(err, counter) {
    if(err) return next(err);
    console.log('HTTP Request returning ' + counter);
    res.send('This page has been viewed ' + counter + ' times!  (Server:'+thisServer+', Container:'+process.env.HOSTNAME+')');
  });
});

http.createServer(app).listen(process.env.PORT || 80, function() {
  console.log('Listening on port ' + (process.env.PORT || 80));
});
