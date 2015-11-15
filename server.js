var express = require('express');
var slots = require('./src/core/slots')();
var app = express();
var _ = require('lodash');

var PORT = 8082;

var session;

app.enable('trust proxy');

//be able to load the files under the conf directory
app.use(express.static('conf'));

app.get('/slots', function(req, res) {
  res.send(slots.list());
});

app.get('/session', function(req, res) {
  if(session){
    res.send(session);
  } else {
    res.sendStatus(204);
  }
});

app.post('/session', function(req, res) {
  session = {slots : slots.list()};
  res.send(session);
});

app.delete('/session',function(req, res){
  session = null;
  res.end();
});

var server = app.listen(PORT, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
