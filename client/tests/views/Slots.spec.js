import expect from 'expect';
import expectJSX from 'expect-jsx';
import React from 'react';
import {wrap} from '../wrapper';
import ShallowTestUtils from 'react-shallow-testutils';
import _ from 'lodash';
import TestUtils from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import { Slots } from 'components/ChooseSlotsView/Slots';
import { Slot } from 'components/ChooseSlotsView/Slot';

expect.extend(expectJSX);

function setup() {
  let props = {
    period: 'period',
    talks: [{
      id: 2,
      text: 'text',
      fondation: 'Back',
      selected: false
    }],
    onClick: expect.createSpy()
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<Slot {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('Slots components', () => {
  it('Should include an <ul> containing slots and talks', function () {
    const { output } = setup();

    let talk = ShallowTestUtils.findWithClass(output, "talk");

    expect(talk.key).toBe('2');
    expect(talk.props.primaryText).toBe('text');
  });

  describe('Submitting choosen talks', function () {

    it('should send choosen talks', function () {
      const { output, props } = setup();
      let submitTalk = ShallowTestUtils.findWithClass(output, "talk");

      expect(props.onClick.calls.length).toBe(0);

      submitTalk.props.onClick();

      expect(props.onClick.calls.length).toBe(1);
    });
  });
});

