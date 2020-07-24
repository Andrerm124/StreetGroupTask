import React from 'react';
import PropTypes from 'prop-types';
import { Header as NBHeader, Left, Right, Body, Title, Button, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import HeaderStyle from './HeaderStyle';

const Header = ({ onBackPress, title }) => {
  const navigation = useNavigation();
  const titleIsString = title && typeof title === 'string';

  return (
    <NBHeader style={HeaderStyle.rootHeader}>
      <Left style={HeaderStyle.leftButtonContainer}>
        <Button transparent onPress={onBackPress ?? navigation.goBack}>
          <Icon name='arrow-back' accessibilityLabel='Back Button' />
        </Button>
      </Left>

      <Body style={HeaderStyle.titleContainer}>
        {titleIsString ? <Title>{title}</Title> : title}
      </Body>

      <Right style={HeaderStyle.rightButtonContainer} />
    </NBHeader>
  );
};

Header.propTypes = {
  onBackPress: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Header.defaultProps = {
  onBackPress: undefined,
  title: undefined,
};

export default Header;
