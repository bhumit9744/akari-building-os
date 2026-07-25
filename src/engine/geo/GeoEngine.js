import { APP_CONFIG } from '../../core/config/config'

/**
 * Geospatial Engine for Mapbox ↔ Three.js synchronization
 */
export class GeoEngine {
  constructor(origin = APP_CONFIG.campusCoords) {
    this.origin = origin
    this.metersPerDegreeLat = 111320
    this.metersPerDegreeLon = (40075000 / 360) * Math.cos((origin.latitude * Math.PI) / 180)
  }

  /**
   * Converts (Lat, Lon, Alt) to local Three.js (X, Y, Z) coordinates
   */
  project(lat, lon, alt = 0) {
    const dLat = lat - this.origin.latitude
    const dLon = lon - this.origin.longitude

    const x = dLon * this.metersPerDegreeLon
    const z = -dLat * this.metersPerDegreeLat
    const y = alt - this.origin.altitude

    return [x, y, z]
  }

  /**
   * Converts local Three.js (X, Y, Z) back to (Lat, Lon, Alt)
   */
  unproject(x, y, z) {
    const dLat = -z / this.metersPerDegreeLat
    const dLon = x / this.metersPerDegreeLon

    return {
      latitude: this.origin.latitude + dLat,
      longitude: this.origin.longitude + dLon,
      altitude: this.origin.altitude + y,
    }
  }

  /**
   * Calculates bearing between two lat/lon points in degrees
   */
  calculateBearing(lat1, lon1, lat2, lon2) {
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const y = Math.sin(dLon) * Math.cos((lat2 * Math.PI) / 180)
    const x =
      Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
      Math.sin((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.cos(dLon)

    const brng = (Math.atan2(y, x) * 180) / Math.PI
    return (brng + 360) % 360
  }
}

export const geoEngine = new GeoEngine()
