import expect from 'expect';
import _ from 'lodash';
import {session as reducer} from '../../src/reducers/session';

describe('Session Reducers', () => {
  const state = {
    id: null,
    status: 'UNKNOWN'
  };

  it('should handle UPDATE_SESSION', () => {
    const updateSessionData = {
      session: {
        id: '1234345',
        status: 'ACTIVE'
      }
    };

    let newState = reducer(state, {
      type: 'UPDATE_SESSION',
      updateSession: updateSessionData
    });

    expect(newState.id).toBe('1234345');
    expect(newState.status).toBe('ACTIVE');

  });

  it('should handle any action', () => {
    const updateSessionData = {
      session: {
        id: '1234345',
        status: 'ACTIVE'
      }
    };

    let newState = reducer(state, {
      type: 'TOTO',
      updateSession: updateSessionData
    });

    expect(newState.id).toBe(null);
    expect(newState.status).toBe('UNKNOWN');

  });
});

