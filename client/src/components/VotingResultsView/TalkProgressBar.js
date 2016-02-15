import React from 'react';
import LinearProgress from 'material-ui/lib/linear-progress';
import {getFondationStyle} from '../fondations.js';
import Avatar from 'material-ui/lib/avatar';

import styles from 'material-ui/lib/styles';

const colors = styles.Colors;

const style = {
  margin: 10
};

export const TalkProgressBar = ({ text, attendees, fondation }) => (
  <div className='container-fluid'>
    <div className='row ' style={style}>
      <div className='col-md-1'>
        <Avatar
          color={colors.white}
          backgroundColor={getFondationStyle(fondation).color}
          style={{fontSize: '13px', top: '-px'}}
        >
          {attendees}
        </Avatar>
      </div>
      <div className='col-md-11'>
        <div className='row'>
          <div className='col-md-8'>
            {text}
          </div>
          <div className='col-md-12'>
            <LinearProgress mode='determinate'
                            value={attendees}
                            max={70}
                            style={{height: '5px'}}
                            color={getFondationStyle(fondation).color}
                            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TalkProgressBar;
