import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import spy from 'expect';
import util from 'util';

import { Session } from 'components/SessionView/Session';
import RaisedButton from 'material-ui/lib/raised-button';
import styles from 'material-ui/lib/styles';


function setup(status) {
  let props = {
    session: {id: null, status: status},
    startSession: spy.createSpy(),
    terminateSession: spy.createSpy()
  };

  let output = shallow(<Session {...props} />);

  return {
    props,
    output
  };
}

describe('Session components', () => {
  it('Should include two <RaisedButton> to start a session', function () {
    const { output, props } = setup("UNKNOWN");
    let sessionButtons = output.find(RaisedButton);

    expect(sessionButtons.length).to.equal(2);

    expect(sessionButtons.at(0).prop('label')).to.equal('Start Morning Session');
    sessionButtons.at(0).simulate('click');
    expect(props.startSession.calls.length).to.equal(1);

    expect(sessionButtons.at(1).prop('label')).to.equal('Start Afternoon Session');
    sessionButtons.at(1).simulate('click');
    expect(props.startSession.calls.length).to.equal(2);

  });

  it('Should include a <RaisedButton> to terminate a session', function () {
    const { output, props } = setup("ACTIVE");
    let sessionButton = output.find(RaisedButton);

    expect(sessionButton.prop('label')).to.equal('Terminate Session');
    expect(props.startSession.calls.length).to.equal(0);
    expect(props.terminateSession.calls.length).to.equal(0);

    sessionButton.simulate('click');

    expect(props.startSession.calls.length).to.equal(0);
    expect(props.terminateSession.calls.length).to.equal(1);

  });
});

