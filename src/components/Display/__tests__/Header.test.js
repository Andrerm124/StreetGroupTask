import React from 'react';
import { View } from 'react-native';
import { render, fireEvent } from 'react-native-testing-library';
import { mockNavigation } from '../../../__mocks__/@react-navigation/native';
import Header from '../Header';

beforeEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe('Header', () => {
  describe('left button', () => {
    it('renders the left button', () => {
      const { getByA11yLabel } = render(<Header />);
      getByA11yLabel('Back Button');
    });

    it('calls navigation.goBack when pressed and onBackPress is not provided', () => {
      const { getByA11yLabel } = render(<Header />);

      fireEvent.press(getByA11yLabel('Back Button'));
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });

    it('calls goBackPress instead of navigation.goBack when provided', () => {
      const mockOnBackPress = jest.fn();
      const { getByA11yLabel } = render(<Header onBackPress={mockOnBackPress} />);

      fireEvent.press(getByA11yLabel('Back Button'));
      expect(mockOnBackPress).toHaveBeenCalled();
      expect(mockNavigation.goBack).not.toHaveBeenCalled();
    });
  });

  describe('header body', () => {
    it('renders the title when the title is a string', () => {
      const { getByText } = render(<Header title='Mock Header' />);
      getByText('Mock Header');
    });

    it('renders a component when title is not a string', () => {
      const { getByA11yLabel } = render(
        <Header title={<View accessibilityLabel='Mock Component' />} />,
      );
      getByA11yLabel('Mock Component');
    });
  });
});
