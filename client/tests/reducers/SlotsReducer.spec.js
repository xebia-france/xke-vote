import expect from 'expect';
import _ from 'lodash';
import {slots as reducer} from '../../src/reducers/slots';

const findTalk = (state, period, talkId) => {
  return _(state)
    .filter(s => s.period === period)
    .map(s => s.talks)
    .flatten()
    .filter(t => t.id === talkId)
    .first();
};

describe('Slots Reducers', () => {
  const state = [{
    period: '8h - 9h',
    talks: [{
      id: 1,
      text: 'slot1',
      attendees: 0,
      selected: false
    }, {
      id: 2,
      text: 'slot2',
      attendees: 0,
      selected: false
    }
    ]
  },
    {
      period: '9h - 10h',
      talks: [{
        id: 3,
        attendees: 0,
        text: 'slot3',
        selected: false
      }, {
        id: 4,
        selected: false,
        attendees: 0,
        text: 'slot4'
      }]
    }];

  it('should handle SELECT_TALK', () => {
    let newState = reducer(state, {
      type: 'SELECT_TALK',
      period: '8h - 9h',
      talkId: 2
    });

    let updatedTalk = findTalk(newState, '8h - 9h', 2);

    expect(updatedTalk.selected).toBe(true);

  });

  it('should handle UPDATE_VOTES', () => {
    const updateVotesData = {
      slots: [
        {
          period: '8h - 9h',
          talks: [{id: 1, attendees: 0}, {id: 2, attendees: 5}]
        },
        {
          period: '9h - 10h',
          talks: [{id: 3, attendees: 0}, {id: 4, attendees: 10}]
        }
      ]
    };

    let newState = reducer(state, {
      type: 'UPDATE_VOTES',
      updateVotes: updateVotesData
    });

    let slot2 = findTalk(newState, '8h - 9h', 2);
    let slot4 = findTalk(newState, '9h - 10h', 4);

    expect(slot2.attendees).toBe(5);
    expect(slot4.attendees).toBe(10);

  });

});

