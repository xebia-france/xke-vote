import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

import spy from 'expect';

import { Slot } from 'components/ChooseSlotsView/Slot';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import styles from 'material-ui/lib/styles';

const colors = styles.Colors;

chai.use(chaiEnzyme());

function setup() {
  let props = {
    period: 'period',
    talks: [{
      id: 2,
      text: 'text',
      fondation: 'Back',
      selected: false
    },
      {
        id: 3,
        text: 'text',
        fondation: 'Craft',
        selected: false
      }],
    onClick: spy.createSpy()
  };

  let output = mount(<Slot {...props} />);

  return {
    props,
    output
  };
}

describe('[ENZYME SHALLOW WITH CHAI ENZYME] Slots components', () => {
  it('Should include an <ul> containing slots and talks', function () {
    const { output } = setup();

    let talk = output.find(ListItem);

    expect(talk).to.have.length(2);

    let avatar = talk.first().prop('leftAvatar');

    console.log(avatar.props);
    expect(avatar.props.backgroundColor).to.equal(colors.red400);
    expect(avatar.props.children).to.equal('Back');
  });

  describe('Submitting choosen talks', function () {

    it('should send choosen talks', function () {
      const { output, props } = setup();

      let submitTalk = output.find(ListItem).first();

      expect(props.onClick.calls.length).to.equal(0);

      submitTalk.find('#talk').first().simulate('click'); //must be a DOM node not a react component

      expect(props.onClick.calls.length).to.equal(1);
    });
  });
});

