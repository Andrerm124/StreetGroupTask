import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import { Button, Text } from 'native-base';

import LandingButtonStyle from './LandingButtonStyle';

const LandingButton = ({ label, onPress, style }) => {
  return (
    <Button onPress={onPress} full style={[LandingButtonStyle, style]}>
      <Text>{label}</Text>
    </Button>
  );
};

LandingButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

LandingButton.defaultProps = {
  style: undefined,
};

export default LandingButton;
