import React from 'react';
import { fireEvent, render } from 'react-native-testing-library';
import Home from '../home';

describe('Home', () => {
  it("renders the correct logo image with resizeMode set to 'contain'", () => {
    const { getByA11yLabel } = render(<Home navigation={{}} />);
    const logoImage = getByA11yLabel('Street Group Logo');

    expect(logoImage).toHaveProp('source', {
      testUri: '../../../src/media/street-group.png',
    });
    expect(logoImage).toHaveStyle({ resizeMode: 'contain' });
  });

  describe('Navigation', () => {
    it('renders the Bank Holidays button and navigates to BankHolidays when clicked', () => {
      const mockNavigation = {
        navigate: jest.fn(),
      };
      const { getByText } = render(<Home navigation={mockNavigation} />);

      fireEvent.press(getByText('Bank Holidays'));
      expect(mockNavigation.navigate).toHaveBeenCalledWith('BankHolidays');
    });

    it('renders the Map button and navigates to Map when clicked', () => {
      const mockNavigation = {
        navigate: jest.fn(),
      };
      const { getByText } = render(<Home navigation={mockNavigation} />);

      fireEvent.press(getByText('Map'));
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Map');
    });
  });
});
