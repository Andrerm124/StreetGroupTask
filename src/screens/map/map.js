import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { H1, Button, Text } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import HeaderLogo from '../../components/Display/HeaderLogo';
import ScreenContainer from '../../components/Display/ScreenContainer';
import useLocation from '../../hooks/locationHook';
import mapStyle from './mapStyle';
import theme from '../../theme/variables';

const destinationLatLong = { latitude: 53.4881, longitude: -2.2437 };

const Map = () => {
  const [startLocation, setStartLocation] = useState();
  const [navigating, setNavigating] = useState(false);
  const mapRef = useRef(null);

  const updatePosition = useCallback((location) => {
    mapRef?.current?.animateToRegion(location, 500);
  }, []);

  const currentLocation = useLocation(updatePosition);

  const toggleNavigation = () => {
    const shouldNavigate = !navigating;

    if (shouldNavigate) {
      setStartLocation(currentLocation);
      mapRef?.current?.fitToElements(true);
    } else {
      mapRef?.current?.animateToRegion(currentLocation, 500);
    }

    setNavigating(shouldNavigate);
  };

  return (
    <ScreenContainer showHeader title={<HeaderLogo />}>
      <H1 style={mapStyle.header}>Map</H1>
      <View style={mapStyle.divider} />

      <MapView
        style={mapStyle.mapContainer}
        ref={mapRef}
        initialRegion={currentLocation}
        accessibilityLabel='Map'
      >
        <Marker coordinate={destinationLatLong} accessibilityLabel='Destination Marker' />

        {!!currentLocation && (
          <Marker
            coordinate={currentLocation}
            pinColor={theme.brandPrimary}
            accessibilityLabel='Currrent Location Marker'
          />
        )}

        {!!navigating && (
          <MapViewDirections
            apikey='#RedactedKey#'
            origin={startLocation}
            destination={destinationLatLong}
            strokeWidth={3}
            strokeColor={theme.brandPrimary}
            accessibilityLabel='Map Directions'
          />
        )}
      </MapView>

      <Button full onPress={toggleNavigation}>
        {!!navigating && <Text>Stop Navigation</Text>}
        {!navigating && <Text>Start Navigation</Text>}
      </Button>
    </ScreenContainer>
  );
};

export default Map;
