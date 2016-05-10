import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { startSession } from '../../actions/slotsActions';
import { terminateSession } from '../../actions/slotsActions';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';

const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = (dispatch) => ({
  startSession: (moment) => {
    dispatch(startSession(moment));
  },
  terminateSession: () => {
    dispatch(terminateSession());
  }
});

export const Session = React.createClass({
  propTypes: {
    session: PropTypes.object.isRequired,
    startSession: PropTypes.func.isRequired,
    terminateSession: PropTypes.func.isRequired
  },
  render: function () {
    let { startSession, terminateSession } = this.props;
    let sessionButton;
    if (this.props.session.status === 'ACTIVE') {
      sessionButton = <RaisedButton primary label='Terminate Session' onClick={() => terminateSession()}/>;
    } else {
      sessionButton = <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
        <RaisedButton primary label='Start Morning Session' onClick={() => startSession('am')}/>
        <RaisedButton primary label='Start Afternoon Session' onClick={() => startSession('pm')}/>
      </div>;
    }
    return (
      <div className='container-fluid'>
        <div className='row'>
          <AppBar title='XKE Agenda' showMenuIconButton={false} style={{backgroundColor: '#6B205F'}}/>
        </div>
        <div className='row'>
          <div className='col-lg-3'>
            {sessionButton}
          </div>
        </div>
      </div>
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
