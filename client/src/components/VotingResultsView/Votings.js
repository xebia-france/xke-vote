import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import TalkProgressBar from './TalkProgressBar';
import AppBar from 'material-ui/lib/app-bar';
import Paper from 'material-ui/lib/paper';
import {updateVotes} from '../../actions/slotsActions';

const mapStateToProps = (state) => ({
  slots: state.slots
});

const mapDispatchToProps = (dispatch) => ({
  updateVotes: (state) => {
    dispatch(updateVotes(state));
  }
});

const paperStyle = {
  margin: 20
};

export const Votings = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    slots: PropTypes.arrayOf(PropTypes.shape({
      period: PropTypes.string.isRequired,
      talks: PropTypes.array.isRequired
    }).isRequired).isRequired
  },

  render: function () {
    let { slots } = this.props;
    return (
      <div className='container-fluid'>
        <div className='row'>
          <AppBar title='Resultats des votes' showMenuIconButton={false} style={{backgroundColor: '#6B205F'}}/>
        </div>
        <div className='row'>
          {slots.map(slot =>
            <div className='col-lg-6'>
              <Paper style={paperStyle} zDepth={2}>
                <div className='row'>
                  <h5 style={{marginLeft: '30'}}>{slot.period}</h5>
                </div>
                <div className='row'>
                  {slot.talks.map(talk =>
                    <TalkProgressBar
                      key={talk.id}
                      text={talk.text}
                      attendees={talk.attendees}
                      fondation={talk.fondation}
                      room={talk.room}
                      max={slot.talks.map(talk => talk.attendees).reduce((attendees1, attendees2) => Math.max(attendees1, attendees2), 0)}
                    />
                  )}
                </div>
              </Paper>
            </div>
          )}
        </div>
      </div>

    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Votings);
