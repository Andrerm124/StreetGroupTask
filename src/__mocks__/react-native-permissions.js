const request = jest.fn().mockReturnValue(Promise.resolve('granted'));

const Permissions = {
  request,
};

export default Permissions;

export const PERMISSIONS = {
  IOS: {
    LOCATION_WHEN_IN_USE: 'LOCATION_WHEN_IN_USE',
    LOCATION_ALWAYS: 'LOCATION_ALWAYS',
    CAMERA: 'IOS_CAMERA',
  },
  ANDROID: {
    ACCESS_FINE_LOCATION: 'ACCESS_FINE_LOCATION',
    CAMERA: 'ANDROID_CAMERA',
  },
};
