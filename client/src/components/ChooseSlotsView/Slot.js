import React, { PropTypes } from 'react';
import _ from 'lodash';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import styles from 'material-ui/lib/styles';
import Paper from 'material-ui/lib/paper';

const colors = styles.Colors;

const paperStyle = {
  margin: 20
};

const subHeaderList = {
  fontSize: '1.5em',
  fontStyle: 'bold'
};

const fondations = [
  {title: 'Front', color: colors.lightBlue400},
  {title: 'Craft', color: colors.lightGreen400},
  {title: 'Devops', color: colors.orange400},
  {title: 'Cloud', color: colors.teal400},
  {title: 'Back', color: colors.red400},
  {title: 'Agile', color: colors.blueGrey400},
  {title: 'IoT', color: colors.brown400},
  {title: 'Mobile', color: colors.indigoA400}];

const getFondationStyle = (fondation) => {
  return _(fondations).filter(f => f.title === fondation).first();
};

export const Slot = ({ period, talks, onClick }) => (
  <div>
    <Paper style={paperStyle} zDepth={2}>
      <List key={period} subheader={period} subheaderStyle={subHeaderList}>
        {talks.map(talk =>
          <div key={talk.id}>
            <ListItem key={talk.id} onClick={() => onClick(period, talk.id)}
                      style={{backgroundColor: talk.selected ? colors.purple200 : colors.white}}
                      id='talk'
                      primaryText={talk.text}
                      leftAvatar={
                      <Avatar
                         color={colors.white}
                         backgroundColor={getFondationStyle(talk.fondation).color}
                         style={{fontSize: '9px', top: '-px'}}
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
