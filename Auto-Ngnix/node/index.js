var express = require('express'),
    http = require('http'),
    redis = require('redis');

var app = express();
// CORS Support (allow Cross-Browser Orgin)
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
//console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);
// APPROACH 1: Using environment variables created by Docker
// var client = redis.createClient(
//  process.env.REDIS_PORT_6379_TCP_PORT,
//    process.env.REDIS_PORT_6379_TCP_ADDR
// );

// APPROACH 2: Using host entries created by Docker in /etc/hosts (RECOMMENDED)
var client = redis.createClient('6379', 'redis');

var thisServer=0;

client.incr('serverCounter', function(err, serverCounter) {
  thisServer=serverCounter;
});

app.use('/public',express.static('/src/public'));



app.get('/', function(req, res, next) {
  client.incr('counter', function(err, counter) {
    if(err) return next(err);
    console.log('HTTP Request returning ' + counter);
    var latencyStart=Date.now();
    var timeTaken=0;
        while (timeTaken<40){ //delay to create some latency (v1.0 should be 20; v1.1 should be 40; v1.2 should be 10)
          //do nothing!
            timeTaken=Date.now()-latencyStart;
        }
    res.send('This page has been viewed ' + counter + ' times!  (Server:'+thisServer+', Container:'+process.env.HOSTNAME+', Version: 1.1)');
  });
});

http.createServer(app).listen(process.env.PORT || 80, function() {
  //console.log('Listening on port ' + (process.env.PORT || 80));
});

/*

var express = require('express'),
    http = require('http'),
    redis = require('redis');

var app = express();


// CORS Support (allow Cross-Browser Orgin)
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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

app.use('/public',express.static('/src/public'));



app.get('/', function(req, res, next) {
    client.incr('counter', function(err, counter) {
        if(err) return next(err);
        //var latencyStart=Date.Now();
        console.log('HTTP Request returning ' + counter);
        console.log(latencyStart);
        var timeTaken=0;
        while (timeTaken<1000){ //delay to create some latency
        	//do nothing!
            timeTaken=Date.Now()-latencyStart;
            console.log(timeTaken);

        }
        res.send('This page has been viewed ' + counter + ' times!  (Server:'+thisServer+', Container:'+process.env.HOSTNAME+')');
    });
});


http.createServer(app).listen(9000, function() {
    console.log('Listening on port ' + (9000));
});*/
