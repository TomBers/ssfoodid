var express = require('express');

var request = require("request");






var app = express.createServer(express.logger());

app.get('/', function(request, res) {
  res.send('Hello Andy');
});

app.get('/read', function(request, res) {
  
  var purl = 'https://api.mongolab.com/api/1/databases/heroku_app13153679/collections?apiKey=TS3DbEeRXGUBrrX3It--_vLWIzZN5SB2';
  request(purl, function(error, response, body) {

res.end(body);


});
  
});









var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
