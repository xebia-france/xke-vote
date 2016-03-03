import express from 'express';
import  {slots} from './core/slots';
import socketIo from 'socket.io';
import makeStore from './core/store';
import {slotsData} from './conf/slots.js';

const app = module.exports = express();
let io;
let store;
let session;

app.enable('trust proxy');

//be able to load the files under the conf directory
app.use(express.static('conf'));

app.get('/slots', (req, res) => {
  console.log(slots.list());
  res.send(slots.list());
});

app.get('/session', (req, res) => {
  if(session) {
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

  let server = app.listen(port || 8082);
  io = socketIo(server);
  io.on('connection', (socket) => {
    console.log('socket is on :-)');
    socket.emit('updateSession', store.getState());
    socket.on('action', (action) => {
      switch(action.type) {
        case 'SUBMIT_CHOOSEN_TALKS':
          store.dispatch(action);
          io.emit('updateVotes', store.getState());
          break;
        case 'START_SESSION':
          //Copie initial slots
          var slots = JSON.parse(JSON.stringify(slotsData));
          store.dispatch({
            type: 'START_SESSION',
            slots: slots
          });
          console.log(store.getState());
          io.emit('updateSession', store.getState());
          break;
        case 'TERMINATE_SESSION':
          store.dispatch({
            type: 'TERMINATE_SESSION'
          });
          io.emit('updateSession', store.getState());
          break;
        default:
          store.dispatch(action);
      }
    });
  });
  return server;
};

export default app;