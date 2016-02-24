import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import {slots} from '../reducers/slots';
import {session} from '../reducers/session';

export default combineReducers({
  router,
  slots,
  session
});
