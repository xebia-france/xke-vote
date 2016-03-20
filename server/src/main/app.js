import express from 'express';
import socketIo from 'socket.io';
import makeStore from './core/store';
import {slotsData} from './conf/slots.js';

const app = module.exports = express();
let io;
let store;

app.enable('trust proxy');

//be able to load the files under the conf directory
app.use(express.static('conf'));

app.start = (port) => {
  store = makeStore();
  let listenPort = port || 8082;
  let server = app.listen(listenPort);
  console.log(`Server is now running at localhost:${port}.`);

  io = socketIo(server);
  io.on('connection', (socket) => {
    console.log('new connection by ' + socket.id);
    socket.emit('updateSession', store.getState());
    socket.on('action', (action) => {
      switch(action.type) {
        case 'SUBMIT_CHOOSEN_TALKS':
          store.dispatch(action);
          console.log('SUBMIT_CHOOSEN_TAKS by ' + socket.id);
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
          console.log('START_SESSION by ' + socket.id);
          io.emit('updateSession', store.getState());
          break;
        case 'TERMINATE_SESSION':
          store.dispatch({
            type: 'TERMINATE_SESSION'
          });
          console.log('TERMINATE_SESSION by ' + socket.id);
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