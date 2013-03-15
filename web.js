var express = require('express');
var mongo = require('mongoskin');








var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('Hello Andy');
});

app.get('/readMongoDB', function(request, response) {
var request = require("request");

request('https://api.mongolab.com/api/1/databases/heroku_app13153679/collections?apiKey=TS3DbEeRXGUBrrX3It--_vLWIzZN5SB2', function(error, response, body) {

var dat = JSON.parse(body);
request(purl, function(error, response, body) {

res.end(body);
}

});

app.get('/read', function(request, response) {
  
  var rslt = ' R : ';

   var db = require('mongoskin').db('localhost:27017/test');
 
 db.collection('things').find().toArray(function(err, result) {
    if (err) throw err;
    rslt += result;
    console.log(result);
});

response.send('results ' + rslt);

});

app.get('/write', function(request, response) {
  response.send('write junck to db');
  
  
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
