import {setSlots, updateAttendees} from './slots';
import {rooms} from '../conf/rooms';
import _ from 'lodash';
import uuid from 'uuid';

const defaultState = {session: {status: "UNKNOWN"}, slots: [], voters: []};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'START_SESSION':
      var finalState = {session: {id: uuid.v4(), status: "ACTIVE"}, slots: setSlots([], action.slots), voters: []};
      return finalState;
      break;
    case 'TERMINATE_SESSION':
      return {...state, slots: chooseRooms(state.slots), session: {id: state.session.id, status: "TERMINATE"}};
      break;
    case 'SUBMIT_CHOOSEN_TALKS':
      if (!_.contains(state.voters, action.voter) || !action.checkVote) {
        updateAttendees(state.slots, action.choosenTalks);
        return {...state, voters: [...state.voters, action.voter]};
      } else {
        return state;
      }

      break;
  }
  return state;
};

const chooseRooms = (slots) => {
  return slots.map(s => {
    var roomsByPriority = _.sortBy(rooms, 'priority').reverse();
    var talks = _(s.talks).sortBy('id').sortBy('attendees').value().reverse();
    return {...s, talks: talks.map(t => {
      return {...t, room: roomsByPriority.pop().name};
    })};
  });
};

export default reducer;