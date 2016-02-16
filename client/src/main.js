import React from 'react';
import ReactDOM from 'react-dom';
import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import routes from './routes';
import Root from './components/containers/Root';
import configureStore from './utils/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import io from 'socket.io-client';
import { initState } from './actions/slotsActions';

injectTapEventPlugin();

const historyConfig = { basename: __BASENAME__ };
const history = useRouterHistory(createHistory)(historyConfig);

const initialState = window.__INITIAL_STATE__;
const store = configureStore({ initialState, history });

const socket = io(`${location.protocol}//${location.hostname}:8082`);
socket.on('initState', state =>
  store.dispatch(initState(state))
);

// Render the React application to the DOM
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
