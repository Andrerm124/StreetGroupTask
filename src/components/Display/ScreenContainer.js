import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'native-base';
import Header from './Header';

const ScreenContainer = ({ showHeader, title, onHeaderBackPress, children }) => {
  return (
    <Container>
      {!!showHeader && <Header title={title} onBackPress={onHeaderBackPress} />}

      {children}
    </Container>
  );
};

export default ScreenContainer;

ScreenContainer.propTypes = {
  showHeader: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onHeaderBackPress: PropTypes.func,
  children: PropTypes.node,
};

ScreenContainer.defaultProps = {
  title: undefined,
  onHeaderBackPress: undefined,
  children: undefined,
};
