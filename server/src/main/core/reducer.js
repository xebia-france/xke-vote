import {setSlots, addAttendees} from './slots';
import _ from 'lodash';

export const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SLOTS':
      return setSlots(state, action.slots);
      break;
    case 'SUBMIT_CHOOSEN_TALKS':
      state.map(s => {
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