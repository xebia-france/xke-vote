import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectTalk } from '../../actions/slotsActions';
import { submitChoosenTalks } from '../../actions/slotsActions';
import Slot from './Slot';

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

export const Slots = ({ slots, selectTalk, submitChoosenTalks }) => (
  <div>
    <ul id="slots">
      {slots.map(slot =>
        <Slot
          key={slot.period}
          {...slot}
          onClick={selectTalk}
        />
      )}
    </ul>
    <button onClick={submitChoosenTalks}>Submit</button>
  </div>
);

Slots.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.shape({
    period: PropTypes.string.isRequired,
    talks: PropTypes.array.isRequired
  }).isRequired).isRequired,
  selectTalk: PropTypes.func.isRequired,
  submitChoosenTalks: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Slots)
