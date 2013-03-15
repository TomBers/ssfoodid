var express = require('express');

var request = require("request");






var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('Hello Andy');
});

app.get('/readMongoDB', function(request, response) {


request('https://api.mongolab.com/api/1/databases/heroku_app13153679/collections?apiKey=TS3DbEeRXGUBrrX3It--_vLWIzZN5SB2', function(error, response, body) {



response.end(body);
}

});



var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
