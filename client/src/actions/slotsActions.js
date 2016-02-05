import makeActionCreator from '../utils/actionCreator';

const SELECT_TALK = 'SELECT_TALK';
const SUBMIT_CHOOSEN_TALKS = 'SUBMIT_CHOOSEN_TALKS';

export const selectTalk = makeActionCreator(SELECT_TALK, 'period', 'talkId');
export const submitChoosenTalks = makeActionCreator(SUBMIT_CHOOSEN_TALKS);

/*
make action creator is a utility, you can also describe your functions like this :

export const selectTalk = (period, talkId) => {
  return {
    type: SELECT_TALK,
    period,
    talkId
  };
};

export const submitChoosenTalks = () => {
  return {
    type: SUBMIT_CHOOSEN_TALKS
  };
};*/
