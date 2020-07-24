import Geolocation from '@react-native-community/geolocation';
import { useCallback, useEffect, useState } from 'react';
import { getLocationPermissions } from '../utils/permissions';

const defaultMapDelta = { latitudeDelta: 0.0922, longitudeDelta: 0.0421 };

const useLocation = (locationUpdateCallback) => {
  const [location, setLocation] = useState();

  const updateLocation = useCallback((position) => {
    const { longitude, latitude } = position?.coords ?? {};

    const updatedLocation = {
      longitude,
      latitude,
      ...defaultMapDelta,
    };

    setLocation(updatedLocation);
    locationUpdateCallback?.(updatedLocation);
  }, []);

  useEffect(() => {
    (async () => {
      await getLocationPermissions();

      Geolocation.getCurrentPosition(updateLocation);
      Geolocation.watchPosition(updateLocation);
    })();

    return () => {
      Geolocation.clearWatch();
    };
  }, [locationUpdateCallback, updateLocation]);

  return location;
};

export default useLocation;
