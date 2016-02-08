import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectTalk } from '../../actions/slotsActions';
import { submitChoosenTalks } from '../../actions/slotsActions';
import Slot from './Slot';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';

const mapStateToProps = (state) => ({
  slots: state.slots
});
export const Slots = ({ slots, selectTalk, submitChoosenTalks }) => (
  <div className='container-fluid'>
    <div className='row'>
      <AppBar title='XKE Agenda 2' showMenuIconButton={false}/>
    </div>
    <div className='row'>
      {slots.map(slot =>
        <div className='col-md-3'>
          <Slot
            key={slot.period}
            {...slot}
            onClick={selectTalk}
            id='slots'
          />
        </div>
      )}
    </div>
    <div className='row'>
      <div className='col-lg-3'>
        <RaisedButton label='Submit Choices' primary onClick={submitChoosenTalks}
                      style={{margin: 20}}/>
      </div>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  selectTalk: (period, talkId) => {
    dispatch(selectTalk(period, talkId));
  },
  submitChoosenTalks: () => {
    dispatch(submitChoosenTalks());
  }
});

Slots.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.shape({
    period: PropTypes.string.isRequired,
    talks: PropTypes.array.isRequired
  }).isRequired).isRequired,
  selectTalk: PropTypes.func.isRequired,
  submitChoosenTalks: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Slots);
