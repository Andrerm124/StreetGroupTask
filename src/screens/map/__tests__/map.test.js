import React from 'react';
import MapView from 'react-native-maps';
import { fireEvent, render, waitFor } from 'react-native-testing-library';
import * as locationHook from '../../../hooks/locationHook';

import Map from '../map';

jest.mock('react-native-maps-directions', () => {
  const { View } = require('react-native');
  return View;
});

beforeEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe('map', () => {
  const mockMapViewFunctions = {
    fitToElements: jest.fn(),
    animateToRegion: jest.fn(),
  };

  beforeEach(() => {
    jest
      .spyOn(MapView.prototype, 'fitToElements')
      .mockImplementation(mockMapViewFunctions.fitToElements);
    jest
      .spyOn(MapView.prototype, 'animateToRegion')
      .mockImplementation(mockMapViewFunctions.animateToRegion);
  });

  it('renders the header', () => {
    const { getByText } = render(<Map />);
    expect(getByText('Map'));
  });

  it('renders the MapView', () => {
    const { getByA11yLabel } = render(<Map />);
    expect(getByA11yLabel('Map'));
  });

  it('renders the destination marker', () => {
    const { getByA11yLabel } = render(<Map />);
    expect(getByA11yLabel('Destination Marker'));
  });

  it('renders the current location marker', () => {
    jest.spyOn(locationHook, 'default').mockReturnValue({ longitude: 0, latitude: 0 });

    const { getByA11yLabel } = render(<Map />);
    expect(getByA11yLabel('Destination Marker'));
  });

  it('toggles the directions when the navigation button is pressed', async () => {
    const { getByText, queryByA11yLabel } = render(<Map />);

    expect(queryByA11yLabel('Map Directions')).toBeFalsy();

    fireEvent.press(getByText('Start Navigation'));
    await waitFor(() => expect(queryByA11yLabel('Map Directions')).toBeTruthy());

    fireEvent.press(getByText('Stop Navigation'));
    await waitFor(() => expect(queryByA11yLabel('Map Directions')).toBeFalsy());
  });
});
