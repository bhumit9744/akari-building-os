export const APP_CONFIG = {
  appName: 'Akari Digital Twin',
  version: '1.0.0',
  campusCoords: {
    latitude: 37.7749,
    longitude: -122.4194,
    altitude: 0,
    heading: 45,
  },
  camera: {
    defaultPosition: [25, 20, 30],
    defaultTarget: [0, 4, 0],
    fov: 45,
    near: 0.1,
    far: 1000,
  },
  performance: {
    targetFps: 60,
    enableShadowsDefault: true,
    maxDistance: 150,
  },
}
