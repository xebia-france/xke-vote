import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectTalk } from '../../actions/slotsActions';
import { submitChoosenTalks } from '../../actions/slotsActions';
import Slots from './Slots';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';

const mapStateToProps = (state) => ({
  slots: state.slots
});

const mapDispatchToProps = (dispatch) => ({
  selectTalk: (period, talkId) => {
    dispatch(selectTalk(period, talkId));
  },
  submitChoosenTalks: () => {
    dispatch(submitChoosenTalks());
  }
});

export const ChooseSlots = React.createClass({
  propTypes: {
    slots: PropTypes.arrayOf(PropTypes.shape({
      period: PropTypes.string.isRequired,
      talks: PropTypes.array.isRequired
    }).isRequired).isRequired,
    selectTalk: PropTypes.func.isRequired,
    submitChoosenTalks: PropTypes.func.isRequired
  },
  render: function () {
    let { submitChoosenTalks, ...slots } = this.props;
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
            <RaisedButton label='Submit Choices' primary onClick={submitChoosenTalks}
                          style={{margin: 20}}/>
          </div>
        </div>
      </div>
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSlots);