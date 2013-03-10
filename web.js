var express = require('express');
var mongo = require('mongodb');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var mongoUri = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/mydb'; 

client = new Db('test', new Server('127.0.0.1', 27017, {}));

var listAllData = function(err, collection) {
    collection.find().toArray(function(err, results) {
        console.log(results);
    });
}



var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/read', function(request, response) {
  response.send('read from db');
 

    client.collection('things', listAllData);

 
 

});

app.get('/write', function(request, response) {
  response.send('write junck to db');
  
  
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
