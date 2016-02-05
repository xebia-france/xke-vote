import expect from 'expect'
import _ from 'lodash'
import {slots as reducer} from '../../src/reducers/slots'

describe('Slots Reducers', () => {
  const state = [{
      period: '8h - 9h',
      talks: [{
        id: 1,
        text: 'slot1',
        selected: false
      }, {
        id: 2,
        text: 'slot2',
        selected: false
      }
      ]
    },
    {
      period: '9h - 10h',
      talks: [{
        id: 3,
        text: 'slot3',
        selected: false
        }, {
        id: 4,
        selected: false,
        text: 'slot4'
        }]
      }];

  it('should handle SELECT_TALK', () => {
    let state = reducer(state, {
      type: 'SELECT_TALK',
      period: '8h - 9h',
      talkId: 2
    });

    let updatedTalk = _(state)
      .filter(s => s.period === '8h - 9h')
      .map(s => s.talks)
      .flatten()
      .filter(t => t.id === 2)
      .first();

    expect(updatedTalk.selected).toBe(true);

  })
});
