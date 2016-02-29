import React, { PropTypes } from 'react';
import IconButton from 'material-ui/lib/icon-button';

export const HeaderSlot = ({ period, refreshSlot }) => (
  <div className='container-fluid'>
    <div className='row'>
      <div>
        <div className='col-md-7 col-xs-7'>
          {period}
        </div>
        <div className='col-md-2 col-xs-2'>

        </div>
        <div className='col-md-2 col-xs-2'>
          <IconButton iconClassName='material-icons'
                      onTouchTap={() => refreshSlot(period)}
                      onClick={() => refreshSlot(period)}
          >clear</IconButton>
        </div>
      </div>
    </div>
  </div>
);

HeaderSlot.propTypes = {
  period: PropTypes.string.isRequired,
  refreshSlot: PropTypes.func.isRequired
};

export default HeaderSlot;
