import React from 'react';
import { Image, View } from 'react-native';
import headerLogoStyle from './HeaderLogoStyle';

const HeaderLogo = () => (
  <View style={headerLogoStyle.container}>
    <Image
      accessibilityLabel='Street Group Header Logo'
      source={require('../../media/street-group.png')}
      style={headerLogoStyle.image}
    />
  </View>
);

export default HeaderLogo;
