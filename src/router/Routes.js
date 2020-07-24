import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BankHolidays from '../screens/bankHolidays/bankHolidays';
import Home from '../screens/home/home';
import Map from '../screens/map/map';

const RootStack = createStackNavigator();

export default () => (
  <RootStack.Navigator initialRouteName='Home' headerMode='none'>
    <RootStack.Screen name='Home' component={Home} />

    <RootStack.Screen name='BankHolidays' component={BankHolidays} />

    <RootStack.Screen name='Map' component={Map} />
  </RootStack.Navigator>
);
