import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { StyleProvider } from 'native-base';

import getTheme from '../theme/native-base-theme/components';
import theme from '../theme/variables';

import Routes from './Routes';

enableScreens();

const App = () => {
  return (
    <StyleProvider style={getTheme(theme)}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </StyleProvider>
  );
};

export default App;
