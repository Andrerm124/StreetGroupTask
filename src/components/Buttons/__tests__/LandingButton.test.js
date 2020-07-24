import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import LandingButton from '../LandingButton';

describe('LandingButton', () => {
  it('renders with the label text and calls onPress when clicked', () => {
    const mockOnPress = jest.fn();

    const { queryByText } = render(<LandingButton label='Test Label' onPress={mockOnPress} />);
    const buttonText = queryByText('Test Label');
    expect(buttonText).toBeTruthy();

    fireEvent.press(buttonText);
    expect(mockOnPress).toHaveBeenCalled();
  });
});
