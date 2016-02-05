import { combineReducers } from 'redux';
import { routeReducer as router } from 'react-router-redux';
import {slots} from '../reducers/slots';

export default combineReducers({
  router,
  slots
});
