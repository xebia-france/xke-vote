import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectTalk } from '../../actions/slotsActions';
import { submitChoosenTalks } from '../../actions/slotsActions';
import Slots from './Slots';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';
import _ from 'lodash';
import getClientId from '../../utils/clientId';

const mapStateToProps = (state) => ({
  slots: state.slots,
  voters: state.voters
});

const mapDispatchToProps = (dispatch) => ({
  selectTalk: (period, talkId) => {
    dispatch(selectTalk(period, talkId));
  },
  submitChoosenTalks: (slots) => {
    dispatch(submitChoosenTalks(slots));
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
    voters: PropTypes.array.isRequired
  },
  render: function () {
    let { submitChoosenTalks, ...slots } = this.props;
    let alreadyVote = _(this.props.voters).find(voter => voter === getClientId()) !== undefined;
    let choiceComponent;
    if (alreadyVote) {
      choiceComponent = <label>Already Vote!</label>;
    } else {
      choiceComponent = <RaisedButton label='Submit Choices' primary onClick={() => submitChoosenTalks(choosenSlots(this.props.slots))}
                                      style={{margin: 20}}/>;
    }
    return (
      <div className='container-fluid'>
        <div className='row'>
          <AppBar title='XKE Agenda' showMenuIconButton={false}/>
        </div>
        <div className='row'>
          <Slots {...slots} />
        </div>
        <div className='row'>
          <div className='col-lg-3'>
            {choiceComponent}
          </div>
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
