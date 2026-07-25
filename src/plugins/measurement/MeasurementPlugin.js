import { calculateDistance3D } from '../../utils/geo'

export class MeasurementPlugin {
  static measureDistance(pointA, pointB) {
    const distMeters = calculateDistance3D(pointA, pointB)
    return {
      meters: Number(distMeters.toFixed(2)),
      feet: Number((distMeters * 3.28084).toFixed(2)),
    }
  }
}
