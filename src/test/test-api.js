var should = require('chai').should();
var supertest = require('supertest');
var api = supertest("http://localhost:8083");

describe('Slots', function() {
  var server;

  beforeEach(function() {
    var app = require('../main/app');
    server = app.start("8083");
  });

  afterEach(function() {
    if(server !== undefined) {
      server.close();
    }
  });
  it("Should return a 200 response", function(done) {
    api.get('/slots')
      .expect(200, done);
  });

  it("Should list all slots", function(done) {
    api.get('/slots')
      .end(function(err, res) {
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length(2);
        res.body[0].should.have.property('id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('speakers');
        res.body[0].should.have.property('timeSlot');
        res.body[0].should.have.property('votes');
        res.body[0].should.have.property('room');
        res.body[0].id.should.equal(1);
        res.body[0].name.should.equal("slot1");
        done();
      });
  });
});
