var express = require('express');
var slots = require('./core/slots')();
var app = module.exports = express();
var _ = require('lodash');

var session;

app.enable('trust proxy');

//be able to load the files under the conf directory
app.use(express.static('conf'));

app.get('/slots', function(req, res) {
  res.send(slots.list());
});

app.get('/session', function(req, res) {
  if(session) {
    res.send(session);
  } else {
    res.sendStatus(204);
  }
});

app.post('/session', function(req, res) {
  session = {slots: slots.list()};
  res.send(session);
});

app.delete('/session', function(req, res) {
  session = null;
  res.end();
});

app.start = function(port) {
  return app.listen(port || 8082);
};