var express = require('express');
var app = express();
var _ = require('lodash');

var PORT = 8082;

app.enable('trust proxy');

//be able to load the files under the public directory
app.use(express.static('public'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

var server = app.listen(PORT, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
