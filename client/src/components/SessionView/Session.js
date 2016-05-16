import React from 'react';
import { connect } from 'react-redux';
import { startSession } from '../../actions/slotsActions';
import { terminateSession } from '../../actions/slotsActions';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import AppBar from 'material-ui/AppBar/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
  render: function () {
    let { startSession, terminateSession } = this.props;
    let sessionButton;
    if( this.props.session.status === 'ACTIVE') {
      sessionButton = <RaisedButton primary label='Terminate Session' onClick={() => terminateSession()}/>;
    } else {
      sessionButton = <div style={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
        <RaisedButton primary label='Start Morning Session' onClick={() => startSession('am')}/>
        <RaisedButton primary label='Start Afternoon Session' onClick={() => startSession('pm')}/>
      </div>;
    }
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
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
      </MuiThemeProvider>
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
