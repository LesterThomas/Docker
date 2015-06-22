var express = require('express');
var http = require('http');
var app = express();

// CORS Support (allow Cross-Browser Orgin)
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

var through = require('through2')
var loghose = require('./')

var source = loghose({ json: true })
var logArray=[];

source.pipe(through.obj(function(chunk, enc, cb) {
	logArray.push(chunk);
	if (logArray.length>1000) { //set a maximum size for the log array
		logArray.shift();
	}
  	//this.push(JSON.stringify(chunk));
  	//this.push('\n');
  	//console.log(logArray.length) 
  	cb()
})).pipe(process.stdout)

/*setTimeout(function() {
  source.destroy()
}, 20000);
*/

app.get('/logs', function(req, res, next) {
		var logString="[";
		
		while (logArray.length>0) {	
			logString=logString+JSON.stringify(logArray.shift());
			if (logArray.length>0) {
				logString=logString+',';
			}
		}
		logString=logString+"]";
		res.send(logString);
		
    });

http.createServer(app).listen(process.env.PORT || 4000, function() {
    console.log('Listening on port ' + (process.env.PORT || 4000));
});


