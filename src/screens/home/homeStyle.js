import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
  },
  logoContainer: {
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 30,
  },
  logo: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  content: {
    flex: 3,
    justifyContent: 'center',
  },
  landingButton: {},
});
