import { Platform } from 'react-native';
import Permission, { PERMISSIONS } from 'react-native-permissions';

const permissionsMap = {
  location:
    Platform.OS !== 'ios'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
};

// eslint-disable-next-line import/prefer-default-export
export const getLocationPermissions = () => Permission.request(permissionsMap.location);
