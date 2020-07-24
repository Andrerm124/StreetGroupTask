import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    marginTop: 10,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  holidayRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,

    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0, 0.2)',
  },
  holidayRowContainerTop: {
    borderTopWidth: 1,
  },
  holidayRowTitle: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  holidayRowDate: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
