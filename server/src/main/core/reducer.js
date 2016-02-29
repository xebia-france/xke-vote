import {setSlots, updateAttendees} from './slots';
import _ from 'lodash';
import uuid from 'uuid';

const defaultState = {session: {status: "UNKNOWN"}, slots: [], voters: []};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'START_SESSION':
      var finalState = {session: {id: uuid.v4(), status: "ACTIVE"}, slots: setSlots([], action.slots), voters: []};
      console.log(finalState);
      return finalState;
      break;
    case 'TERMINATE_SESSION':
      return {session: {id: state.session.id, status: "TERMINATE"}, slots: [], voters: []};
      break;
    case 'SUBMIT_CHOOSEN_TALKS':
      if (!_.contains(state.voters, action.voter)) {
        updateAttendees(state.slots, action.choosenTalks);
        return {...state, voters: [...state.voters, action.voter]};
      } else {
        return state;
      }

      break;
  }
  return state;
};

export default reducer;