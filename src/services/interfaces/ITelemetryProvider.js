/**
 * Interface contract for Telemetry Providers in Akari Digital Twin Engine
 */
export class ITelemetryProvider {
  connect() {
    throw new Error('ITelemetryProvider.connect() must be implemented.')
  }

  disconnect() {
    throw new Error('ITelemetryProvider.disconnect() must be implemented.')
  }

  subscribe(callback) {
    throw new Error('ITelemetryProvider.subscribe() must be implemented.')
  }

  getLatestData() {
    throw new Error('ITelemetryProvider.getLatestData() must be implemented.')
  }
}
