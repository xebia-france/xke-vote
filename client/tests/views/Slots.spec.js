import expect from 'expect';
import React from 'react';
import _ from 'lodash';
import TestUtils from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import { Slots } from 'components/ChooseSlotsView/Slots';


function setup() {
  let props = {
    slots: [{
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
      }],

    selectTalk: expect.createSpy(),
    submitChoosenTalks: expect.createSpy()
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<Slots {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  }
}

describe('Slots components', () => {
  it('Should include an <ul> containing slots and talks', function () {
    const { output } = setup();

    let [ slots ] = output.props.children;
    expect(slots.type).toBe("ul")

    let slots1 = slots.props.children[0].props;
    let slots2 = slots.props.children[1].props;

    expect(slots1.period).toBe("8h - 9h");
    expect(slots1.talks.length).toBe(2);

    expect(slots2.period).toBe("9h - 10h");
    expect(slots2.talks.length).toBe(2);

  });

  describe('Submitting choosen talks', function () {

    it('should send choosen talks', function () {
      const { output, props } = setup();
      let submit = output.props.children[1];

      expect(props.submitChoosenTalks.calls.length).toBe(0);

      submit.props.onClick();

      expect(props.submitChoosenTalks.calls.length).toBe(1);
    });
  });
});

