import expect from 'expect';
import {voters as reducer} from '../../src/reducers/voters';

describe('Voters Reducers', () => {
  const state = ['1234-5678'];

  it('should handle UPDATE_SESSION', () => {
    const updateSessionData = {
      session: {
        id: '1234345',
        status: 'ACTIVE'
      },
      voters:[]
    };

    let newState = reducer(state, {
      type: 'UPDATE_SESSION',
      updateSession: updateSessionData
    });

    expect(newState.length).toBe(0);
  });

  it('should handle UPDATE_VOTES', () => {
    const updateVotesData = {
      voters: ['4321-5678', '1234-8765']
    };

    let newState = reducer(state, {
      type: 'UPDATE_VOTES',
      updateVotes: updateVotesData
    });

    expect(newState.length).toBe(2);
    expect(newState[0]).toBe('4321-5678');
    expect(newState[1]).toBe('1234-8765');

  });
});

