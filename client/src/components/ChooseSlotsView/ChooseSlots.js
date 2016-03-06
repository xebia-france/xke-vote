import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectTalk } from '../../actions/slotsActions';
import { submitChoosenTalks, refreshSlot } from '../../actions/slotsActions';
import Slots from './Slots';
import FlatButton from 'material-ui/lib/flat-button';
import AppBar from 'material-ui/lib/app-bar';
import _ from 'lodash';
import getClientId from '../../utils/clientId';
import { push } from 'react-router-redux';

const mapStateToProps = (state) => ({
  slots: state.slots,
  voters: state.voters
});

const mapDispatchToProps = (dispatch) => ({
  selectTalk: (period, talkId) => {
    dispatch(selectTalk(period, talkId));
  },
  refreshSlot: (period) => {
    dispatch(refreshSlot(period));
  },
  submitChoosenTalks: (slots, checkVote) => {
    dispatch(submitChoosenTalks(slots, checkVote));
  },
  goToResults: () => {
    dispatch(push('/results'));
  }
});

export const ChooseSlots = React.createClass({
  propTypes: {
    slots: PropTypes.arrayOf(PropTypes.shape({
      period: PropTypes.string.isRequired,
      talks: PropTypes.array.isRequired
    }).isRequired).isRequired,
    selectTalk: PropTypes.func.isRequired,
    submitChoosenTalks: PropTypes.func.isRequired,
    goToResults: PropTypes.func.isRequired,
    voters: PropTypes.array.isRequired,
    route: PropTypes.object.isRequired
  },
  render: function () {
    let { submitChoosenTalks, goToResults, ...slots } = this.props;
    let alreadyVote = _(this.props.voters).find(voter => voter === getClientId()) !== undefined;
    let checkAlreadyVote = this.props.route.checkVote !== undefined ? this.props.route.checkVote : true;
    console.log('check: ' + this.props.route.checkVote);
    console.log('check: ' + checkAlreadyVote);
    let choiceComponent;
    if (!checkAlreadyVote || !alreadyVote) {
      choiceComponent = <FlatButton label='Submit Choices'
                                    onTouchTap={() => {
                                      console.log('onTouch');
                                      submitChoosenTalks(choosenSlots(this.props.slots), checkAlreadyVote);
                                    }
                                    }/>;
    } else {
      goToResults();
    }
    return (
      <div className='container-fluid'>
        <div className='row'>
          <AppBar title='XKE Agenda'
                  showMenuIconButton={false}
                  iconElementRight={choiceComponent}
                  style={{position: 'fixed', backgroundColor: '#6B205F'}}
          />
        </div>
        <div className='row' style={{paddingTop: 60}}>
          <Slots {...slots} style/>
        </div>
      </div>
    );
  }
});

const choosenSlots = (slots) => {
  if (slots) {
    return _(slots).map(s => {
      let selectedTalk = s.talks.filter(t => t.selected)[0];
      if (selectedTalk) {
        return {
          period: s.period,
          talk: selectedTalk.id
        };
      }
    }).compact()
      .value();
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSlots);
