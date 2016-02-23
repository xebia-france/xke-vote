import _ from 'lodash';

export const slots = (state = [], action) => {
  switch (action.type) {
    case 'SELECT_TALK':
      return state.map(s =>
        slot(s, action)
      );
    case 'INIT_STATE':
      return action.initState.map(s => {
        return {
          ...s, talks: s.talks.map(t => {
            return {...t, selected: false};
          })
        };
      });
    case 'UPDATE_VOTES':
      return state.map(s => {
        return slot(s, action);
      });
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
    case 'UPDATE_VOTES':
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
    case 'UPDATE_VOTES':
      let talk = _(action.updateVotes).map('talks').flatten().filter({id: state.id}).first();
      return {...state, attendees: talk.attendees};
    default:
      return state;
  }
};
