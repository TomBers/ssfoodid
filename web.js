var express = require('express');
var fs = require('fs');
var amazonS3 = require('awssum-amazon-s3');
//.load("amazon/s3").S3;

var storage = new amazonS3.S3({
  'accessKeyId':     process.env.BUCKET_ACCESS_KEY_ID, 
  'secretAccessKey': process.env.BUCKET_SECRET_KEY,
  'region':amazonS3.US_EAST_1
});


var index = fs.readFileSync('pic-fit_index.html');
var piccard = fs.readFileSync('pic-card_index.html');




var app = express.createServer(express.logger());

app.get('/', function(request, res) {
  //res.send('Hello Andy, hi Thom');
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);

});

app.get('/pic-card', function(request, res) {
  //res.send('Hello Andy, hi Thom');
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(piccard);

});


app.get('/read', function(req, res) {
  
  var request = require("request");
  var purl = 'https://api.mongolab.com/api/1/databases/heroku_app13153679/collections?apiKey=TS3DbEeRXGUBrrX3It--_vLWIzZN5SB2';
  request(purl, function(error, response, body) {

res.end(body);


});
  
});


app.get('/s3test', function(request,res){


storage.PutObject({
  BucketName:    process.env.BUCKET_NAME,
  ObjectName:    'helloworldmonkey.txt',
  ContentLength: 18,
  Body:          '123456789123456789'
}, function(err, data) {
  console.log('err', err);
  console.log('data', data);
});



});


app.post('/upload', function(req, res){
console.log('into upload');
  var body = '';
  var header = '';
  var content_type = req.headers['content-type'];
  var fileName = req.headers['fileName'];
  console.log('headers are:'+JSON.stringify(req.headers));
 
  
  var boundary = content_type.split('; ')[1].split('=')[1];
  var content_length = parseInt(req.headers['content-length']);
  var headerFlag = true;
  var filename = 'dummy.bin';
  var filenameRegexp = /filename="(.*)"/m;
  console.log('content-type: ' + content_type);
  console.log('boundary: ' + boundary);
  console.log('content-length: ' + content_length);

  req.on('data', function(raw) {
    console.log('received data length: ' + raw.length);
    var i = 0;
    while (i < raw.length)
      if (headerFlag) {
        var chars = raw.slice(i, i+4).toString();
        if (chars === '\r\n\r\n') {
          headerFlag = false;
          header = raw.slice(0, i+4).toString();
          console.log('header length: ' + header.length);
          console.log('header: ');
          console.log(header);
          i = i + 4;
          // get the filename
          var result = filenameRegexp.exec(header);
          if (result[1]) {
            filename = result[1];
          }
          console.log('filename: ' + filename);
          console.log('header done');
        }
        else {
          i += 1;
        }
      }
      else { 
        // parsing body including footer
        body += raw.toString('binary', i, raw.length);
        i = raw.length;
        console.log('actual file size: ' + body.length);
      }
  });

  req.on('end', function() {
    // removing footer '\r\n'--boundary--\r\n' = (boundary.length + 8)
    body = body.slice(0, body.length - (boundary.length + 8))
    console.log('final file size: ' + body.length);
    fs.writeFileSync(__dirname +'/files/' + filename, body, 'binary');
    console.log('done');
    res.redirect('back');
  })
});  

app.get('/upload', function(req, res){
console.log('GET for upload');
 res.send('<form method="post" action="/upload" enctype="multipart/form-data">'
           + '<p>Image: <input type="file" name="test" /></p>'
           + '<p><input type="submit" value="Upload" /></p>'
           + '</form>');
});








var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
