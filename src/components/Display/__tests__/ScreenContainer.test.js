import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render } from 'react-native-testing-library';
import ScreenContainer from '../ScreenContainer';

describe('ScreenContainer', () => {
  describe('Header', () => {
    it('renders the Header when showHeader is true', () => {
      const { queryByText } = render(<ScreenContainer showHeader title='Mock Header' />);
      expect(queryByText('Mock Header')).toBeTruthy();
    });

    it("doesn't render the header is showHeader is false", () => {
      const { queryByText } = render(<ScreenContainer showHeader={false} title='Mock Header' />);
      expect(queryByText('Mock Header')).toBeFalsy();
    });

    it('calls onHeaderBackPress when back press is clicked and showHeader is true', () => {
      const mockBackPress = jest.fn();
      const { getByA11yLabel } = render(
        <ScreenContainer showHeader onHeaderBackPress={mockBackPress} />,
      );

      fireEvent.press(getByA11yLabel('Back Button'));

      expect(mockBackPress).toHaveBeenCalled();
    });
  });

  it('renders the child element that is passed in', () => {
    const { getByText } = render(
      <ScreenContainer showHeader>
        <Text>Mock Child</Text>
      </ScreenContainer>,
    );
    getByText('Mock Child');
  });
});
