import makeActionCreator from '../utils/actionCreator';
import getClientId from '../utils/clientId';
const SELECT_TALK = 'SELECT_TALK';
const REFRESH_SLOT = 'REFRESH_SLOT';
const SUBMIT_CHOOSEN_TALKS = 'SUBMIT_CHOOSEN_TALKS';
const UPDATE_VOTES = 'UPDATE_VOTES';
const UPDATE_SESSION = 'UPDATE_SESSION';
const START_SESSION = 'START_SESSION';
const TERMINATE_SESSION = 'TERMINATE_SESSION';

export const selectTalk = makeActionCreator(SELECT_TALK, 'period', 'talkId');
export const refreshSlot = makeActionCreator(REFRESH_SLOT, 'period');
export const updateVotes = makeActionCreator(UPDATE_VOTES, 'updateVotes');
export const updateSession = makeActionCreator(UPDATE_SESSION, 'updateSession');
export const startSession = () => {
  return {
    type: START_SESSION,
    meta: {remote: true}
  };
};
export const terminateSession = () => {
  return {
    type: TERMINATE_SESSION,
    meta: {remote: true}
  };
};

export const submitChoosenTalks = (choosenTalks, checkVote) => {
  return {
    type: SUBMIT_CHOOSEN_TALKS,
    choosenTalks: choosenTalks,
    checkVote: checkVote,
    voter: getClientId(),
    meta: {remote: true}
  };
};
