import { applyMiddleware, compose, createStore } from 'redux';
import { syncHistory } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import socketIoMiddleware from '../utils/socket_io_middleware';

export default function configureStore ({ initialState = {}, history, socket }) {
  // Sync with router via history instance (main.js)
  const routerHistory = syncHistory(history);
  let routerMiddleware = applyMiddleware(thunk, routerHistory);

  // socket io middleware
  const socketMiddleware = applyMiddleware(socketIoMiddleware(socket));

  // Compose final middleware and use devtools in debug environment
  let middleware = compose(routerMiddleware, socketMiddleware);
  if (__DEBUG__) {
    const devTools = window.devToolsExtension
      ? window.devToolsExtension()
      : require('components/containers/DevTools').default.instrument();
    middleware = compose(routerMiddleware, socketMiddleware, devTools);
  }

  // Create final store and subscribe router in debug env ie. for devtools
  const store = middleware(createStore)(rootReducer, initialState);
  if (__DEBUG__) routerHistory.listenForReplays(store, ({ router }) => router.location);

  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer').default;

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
