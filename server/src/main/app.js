import express from 'express';
import  {slots} from './core/slots';
import socketIo from 'socket.io';
import makeStore from './core/store';
import {slotsData} from './conf/slots.js';

const app = module.exports = express();
let io;
let store;
var session;

app.enable('trust proxy');

//be able to load the files under the conf directory
app.use(express.static('conf'));

app.get('/slots', (req, res) => {
  console.log(slots.list());
  res.send(slots.list());
});

app.get('/session', (req, res) => {
  if (session) {
    res.send(session);
  } else {
    res.sendStatus(204);
  }
});

app.post('/session', (req, res) => {
  session = {slots: slots.list()};
  res.send(session);
});

app.delete('/session', (req, res) => {
  session = null;
  res.end();
});

app.start = (port) => {
  store = makeStore();

  store.dispatch({
    type: 'SET_SLOTS',
    slots: slotsData
  });

  let server = app.listen(port || 8082);
  io = socketIo(server);
  io.on('connection', (socket) => {
    socket.emit('initState', store.getState());
    console.log('socket is on :-)');
    socket.on('action', (action) => {
      store.dispatch(action);
      if (action.type === 'SUBMIT_CHOOSEN_TALKS') {
        io.emit('updateVotes', store.getState());
      }
    });
  });
  return server;
};

export default app;