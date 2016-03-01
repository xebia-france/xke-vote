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

const subHeaderListStyle = {
  fontSize: '1.5em',
  fontStyle: 'bold',
  paddingLeft: 0
};

const avatarFoundationStyle = {
  fontSize: '9px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)'
};

const talkStyle = (talk) => {
  return {
    backgroundColor: talk.selected ? '#6B205F' : colors.white,
    textAlign: 'justify',
    color: talk.selected ? colors.white : colors.black
  };
};

export const Slot = ({ period, talks, onClick, refreshSlot }) => (
  <div>
    <Paper style={paperStyle} zDepth={2}>
      <List key={period} subheader={<HeaderSlot period={period} refreshSlot={refreshSlot} />}
            subheaderStyle={subHeaderListStyle}>
        {talks.map(talk =>
          <div key={talk.id}>
            <ListItem key={talk.id}
                      onTouchTap={() => onClick(period, talk.id)}
                      onClick={() => onClick(period, talk.id)}
                      style={talkStyle(talk)}
                      id='talk'
                      primaryText={talk.text}
                      secondaryTextLines={2}
                      leftAvatar={
                      <Avatar
                         color={colors.white}
                         backgroundColor={getFondationStyle(talk.fondation).color}
                         style={avatarFoundationStyle}
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
