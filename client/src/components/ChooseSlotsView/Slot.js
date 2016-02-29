import React, { PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import styles from 'material-ui/lib/styles';
import Paper from 'material-ui/lib/paper';
import {getFondationStyle} from '../fondations.js';
import HeaderSlot from './HeaderSlot';

const colors = styles.Colors;

const paperStyle = {
  margin: 20
};

const subHeaderList = {
  fontSize: '1.5em',
  fontStyle: 'bold',
  paddingLeft: 0
};

export const Slot = ({ period, talks, onClick, refreshSlot }) => (
  <div>
    <Paper style={paperStyle} zDepth={2}>
      <List key={period} subheader={<HeaderSlot period={period} refreshSlot={refreshSlot} />}
            subheaderStyle={subHeaderList}>
        {talks.map(talk =>
          <div key={talk.id}>
            <ListItem key={talk.id}
                      onTouchTap={() => onClick(period, talk.id)}
                      onClick={() => onClick(period, talk.id)}
                      style={{backgroundColor: talk.selected ? colors.purple200 : colors.white}}
                      id='talk'
                      primaryText={talk.text}
                      secondaryTextLines={2}
                      leftAvatar={
                      <Avatar
                         color={colors.white}
                         backgroundColor={getFondationStyle(talk.fondation).color}
                         style={{fontSize: '9px'}}
                       >
                       {talk.fondation}
                      </Avatar>
                      }
            />
          </div>
        )}
      </List>
    </Paper>
  </div>
);

Slot.propTypes = {
  onClick: PropTypes.func.isRequired,
  period: PropTypes.string.isRequired,
  talks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    fondation: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired
};

export default Slot;
