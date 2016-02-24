import {setSlots, addAttendees} from './slots';
import _ from 'lodash';

const defaultState = {session: {status: "UNKNOWN"}, slots: []};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'START_SESSION':
      var finalState = {...state, session: {id: null, status:"ACTIVE"}, slots: setSlots([], action.slots)};
      console.log(finalState);
      return finalState;
      break;
    case 'TERMINATE_SESSION':
      return {...state, session: { id: null, status:"TERMINATE"}, slots: []};
      break;
    case 'SUBMIT_CHOOSEN_TALKS':
      state.slots.map(s => {
        let selectedTalk = _(action.choosenTalks).filter({period: s.period}).first();
        if (selectedTalk !== undefined) {
          s.talks.map(t => {
            return (t.id === selectedTalk.talk) ? {...t, attendees: t.attendees++} : t;
          });
        } else {
          return s;
        }
      });
      break;
  }
  return state;
};

export default reducer;