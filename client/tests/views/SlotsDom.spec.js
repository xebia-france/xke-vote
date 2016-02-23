import expect from 'expect';
import expectJSX from 'expect-jsx';
import React from 'react';
import ReactDom   from 'react-dom';

import {wrap} from '../wrapper';
import _ from 'lodash';
import TestUtils from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';

import { Slot } from 'components/ChooseSlotsView/Slot';
import Paper from 'material-ui/lib/paper';
import ListItem from 'material-ui/lib/lists/list-item';

/* Those steps are demonstrating DOM testing for React Components */

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

  const component = TestUtils.renderIntoDocument(<div><Slot {...props}/></div>);
  const renderedDOM = () => ReactDom.findDOMNode(component);

  return {
    props,
    component,
    renderedDOM
  };
}

describe('[NATIVE DOM] Slots Dom components', () => {
  it('Should include an <ul> containing slots and talks', function () {
    const { renderedDOM } = setup();

    let talk = renderedDOM().querySelectorAll('#talk');

    expect(talk.length).toBe(1);
    expect(talk[0].textContent).toInclude('Back');
    expect(talk[0].textContent).toInclude('text');
  });

});

