import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TalkProgressBar from './TalkProgressBar';
import AppBar from 'material-ui/lib/app-bar';
import Paper from 'material-ui/lib/paper';

const mapStateToProps = (state) => ({
  slots: state.slots
});

const mapDispatchToProps = (dispatch) => ({});

const paperStyle = {
  margin: 20
};

export const Votings = React.createClass({
  propTypes: {
    slots: PropTypes.arrayOf(PropTypes.shape({
      period: PropTypes.string.isRequired,
      talks: PropTypes.array.isRequired
    }).isRequired).isRequired
  },

  getInitialState: function () {
    return {completed: 0};
  },

  componentDidMount () {
    this.timer = setTimeout(() => this.progress(5), 1000);
  },

  componentWillUnmount () {
    clearTimeout(this.timer);
  },

  progress (completed) {
    if (completed > 70) {
      this.setState({completed: 70});
    } else {
      this.setState({completed});
      const diff = Math.floor(Math.random() * (10 - 1)) + 1;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  },

  render: function () {
    let { slots } = this.props;
    return (
      <div className='container-fluid'>
        <div className='row'>
          <AppBar title='Resultats des votes' showMenuIconButton={false}/>
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
                      attendees={this.state.completed}
                      fondation={talk.fondation}
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
