import {setSlots} from './slots'

export const reducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_SLOTS':
      return setSlots(state, action.slots);
  }
  return state;
};

export default reducer;