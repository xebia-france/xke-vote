import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import {slots} from '../reducers/slots';
import {session} from '../reducers/session';
import {voters} from '../reducers/voters';

export default combineReducers({
  router,
  slots,
  session,
  voters
});
