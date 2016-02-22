import makeActionCreator from '../utils/actionCreator';

const SELECT_TALK = 'SELECT_TALK';
const SUBMIT_CHOOSEN_TALKS = 'SUBMIT_CHOOSEN_TALKS';
const INIT_STATE = 'INIT_STATE';
const UPDATE_VOTES = 'UPDATE_VOTES';

export const selectTalk = makeActionCreator(SELECT_TALK, 'period', 'talkId');
export const initState = makeActionCreator(INIT_STATE, 'initState');
export const updateVotes = makeActionCreator(UPDATE_VOTES, 'updateVotes');

export const submitChoosenTalks = (choosenTalks) => {
  return {
    type: SUBMIT_CHOOSEN_TALKS,
    choosenTalks: choosenTalks,
    meta: {remote: true}
  };
};
