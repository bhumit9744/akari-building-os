import { useTwinStore } from '../store/useTwinStore'

class TelemetrySimulator {
  constructor() {
    this.intervalId = null
    this.subscribers = new Set()
    this.currentData = {
      hvacTemp: 21.8,
      occupancy: 84,
      maxOccupancy: 120,
      powerKw: 14.2,
      solarGenerationKw: 9.4,
      aqi: 98,
      chillerStatus: 'Optimal',
      accessControl: 'Secured',
    }
  }

  start(intervalMs = 2000) {
    if (this.intervalId) return

    this.intervalId = setInterval(() => {
      // Simulate minor sensor fluctuations
      const tempDelta = (Math.random() - 0.5) * 0.4
      const occupancyDelta = Math.floor((Math.random() - 0.5) * 3)
      const powerDelta = (Math.random() - 0.5) * 0.8
      const solarDelta = (Math.random() - 0.5) * 0.2

      this.currentData.hvacTemp = Number((this.currentData.hvacTemp + tempDelta).toFixed(1))
      this.currentData.occupancy = Math.max(10, Math.min(this.currentData.maxOccupancy, this.currentData.occupancy + occupancyDelta))
      this.currentData.powerKw = Number(Math.max(5, this.currentData.powerKw + powerDelta).toFixed(1))
      this.currentData.solarGenerationKw = Number(Math.max(0, this.currentData.solarGenerationKw + solarDelta).toFixed(1))

      // Notify state store and subscribers
      useTwinStore.getState().setTelemetryData?.(this.currentData)
      this.subscribers.forEach((cb) => cb(this.currentData))
    }, intervalMs)
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback)
    callback(this.currentData)
    return () => this.subscribers.delete(callback)
  }
}

export const telemetrySimulator = new TelemetrySimulator()
