import expect from 'expect';
import expectJSX from 'expect-jsx';
import React from 'react';
import {wrap} from '../wrapper';
import ShallowTestUtils from 'react-shallow-testutils';
import _ from 'lodash';
import TestUtils from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';

import { Slot } from 'components/ChooseSlotsView/Slot';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import styles from 'material-ui/lib/styles';

/* Those steps are demonstrating Shallow testing for React Components */

expect.extend(expectJSX);

const colors = styles.Colors;

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
  let component = renderer.render(<Slot {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer,
    component
  };
}

describe('[NATIVE SHALLOW] Slots components', () => {
  it('Should include an <ul> containing slots and talks', function () {
    const { output } = setup();

    let talk = ShallowTestUtils.findWithType(output, ListItem);

    expect(talk.key).toBe('2');
    expect(talk.props.primaryText).toBe('text');

    expect(talk.props.leftAvatar.props.children).toBe('Back');
    expect(talk.props.leftAvatar.props.backgroundColor).toBe(colors.red400);
  });

  describe('Submitting choosen talks', function () {

    it('should send choosen talks', function () {
      const { output, props } = setup();
      let submitTalk = ShallowTestUtils.findWithType(output, ListItem);

      expect(props.onClick.calls.length).toBe(0);

      submitTalk.props.onClick();

      expect(props.onClick.calls.length).toBe(1);
    });
  });
});

