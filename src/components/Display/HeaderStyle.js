import { StyleSheet } from 'react-native';
import theme from '../../theme/variables';

export default StyleSheet.create({
  rootHeader: {
    height: theme.toolbarHeight,
    paddingBottom: 5,
  },
  leftButtonContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightButtonContainer: {
    flex: 1,
  },
});
