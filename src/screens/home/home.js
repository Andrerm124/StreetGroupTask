import PropTypes from 'prop-types';
import React from 'react';
import { View, Image } from 'react-native';
import { Content } from 'native-base';

import LandingButton from '../../components/Buttons/LandingButton';
import ScreenContainer from '../../components/Display/ScreenContainer';

import homeStyle from './homeStyle';

const Home = ({ navigation }) => {
  // region Navigation
  const { navigate } = navigation;
  const navigateToBankHolidays = () => navigate('BankHolidays');
  const navigateToMap = () => navigate('Map');
  // endregion Navigation

  return (
    <ScreenContainer showHeader={false}>
      <Content style={homeStyle.root}>
        <View style={homeStyle.logoContainer}>
          <Image
            accessibilityLabel='Street Group Logo'
            style={homeStyle.logo}
            source={require('../../media/street-group.png')}
          />
        </View>

        <View style={homeStyle.content}>
          <LandingButton label='Bank Holidays' onPress={navigateToBankHolidays} />
          <LandingButton label='Map' onPress={navigateToMap} />
        </View>
      </Content>
    </ScreenContainer>
  );
};

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Home;
