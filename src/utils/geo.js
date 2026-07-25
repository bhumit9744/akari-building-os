import { APP_CONFIG } from '../core/config/config'

const METERS_PER_DEGREE_LAT = 111320
const METERS_PER_DEGREE_LON = 40075000 / 360 // Approximated at equator

/**
 * Converts a (Latitude, Longitude) coordinate to local 3D world space (X, Z) relative to Campus Origin.
 */
export function latLngToWorld(lat, lon) {
  const origin = APP_CONFIG.campusCoords
  const dLat = (lat - origin.latitude) * METERS_PER_DEGREE_LAT
  const dLon = (lon - origin.longitude) * METERS_PER_DEGREE_LON * Math.cos((origin.latitude * Math.PI) / 180)

  return {
    x: dLon,
    z: -dLat, // Z points south in 3D coordinate space
  }
}

/**
 * Converts local 3D world space (X, Z) back to (Latitude, Longitude).
 */
export function worldToLatLng(x, z) {
  const origin = APP_CONFIG.campusCoords
  const dLat = -z / METERS_PER_DEGREE_LAT
  const dLon = x / (METERS_PER_DEGREE_LON * Math.cos((origin.latitude * Math.PI) / 180))

  return {
    latitude: origin.latitude + dLat,
    longitude: origin.longitude + dLon,
  }
}

/**
 * Calculates Euclidean 3D distance between two world points.
 */
export function calculateDistance3D(p1, p2) {
  const dx = p1[0] - p2[0]
  const dy = p1[1] - p2[1]
  const dz = p1[2] - p2[2]
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}
