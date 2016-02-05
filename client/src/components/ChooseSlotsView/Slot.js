import React, { PropTypes } from 'react';

const Slot = ({ period, talks, onClick }) => (
  <li key={period} id={period}>
    {period}
    <ul id="talks">
      {talks.map(talk =>
        <li key={talk.id} onClick={() => onClick(period, talk.id)}
            style={{textDecoration: talk.selected ? 'line-through' : 'none'}}
            id={talk.text}
        >
          {talk.text}
        </li>
      )}
    </ul>
  </li>
);

Slot.propTypes = {
  onClick: PropTypes.func.isRequired,
  period: PropTypes.string.isRequired,
  talks: PropTypes.array.isRequired
};

export default Slot;
