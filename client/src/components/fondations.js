import _ from 'lodash';

import styles from 'material-ui/lib/styles';
const colors = styles.Colors;

const fondations = [
  {title: 'Front', color: colors.lightBlue400},
  {title: 'Craft', color: colors.lightGreen400},
  {title: 'Devops', color: colors.orange400},
  {title: 'Cloud', color: colors.teal400},
  {title: 'Back', color: colors.red400},
  {title: 'Agile', color: colors.blueGrey400},
  {title: 'IoT', color: colors.brown400},
  {title: 'Mobile', color: colors.indigoA400}];

export const getFondationStyle = (fondation) => {
  return _(fondations).filter(f => f.title === fondation).first();
};
