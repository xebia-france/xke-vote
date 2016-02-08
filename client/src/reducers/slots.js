import {fakeSlots} from './fakeSlotsData';

export const slots = (state = fakeSlots, action) => {
  switch (action.type) {
    case 'SELECT_TALK':
      return state.map(s =>
        slot(s, action)
      );
    case 'SUBMIT_CHOOSEN_TALKS':
      let choosenSlots = state.map(s => {
        return {
          period: s.period,
          talk: s.talks.filter(t => t.selected)[0].id // handle case where no talk selected
        };
      });
      console.log(choosenSlots);
      return state;
    default:
      return state;
  }
};

const slot = (state, action) => {
  switch (action.type) {
    case 'SELECT_TALK':
      if (state.period !== action.period) {
        return state;
      }
      return {
        ...state, talks: state.talks.map(t =>
          talk(t, action)
        )
      };
    default:
      return state;
  }
};

const talk = (state, action) => {
  switch (action.type) {
    case 'SELECT_TALK':
      return state.id !== action.talkId ? {...state, selected: false} : {...state, selected: true};
    default:
      return state;
  }
};
