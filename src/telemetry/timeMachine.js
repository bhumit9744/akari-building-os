import { useTwinStore } from '../store/useTwinStore'

class TimeMachine {
  constructor() {
    this.buffer = []
    this.maxSnapshots = 24 * 60 // 24 hours of minute snapshots
    this.isLive = true
    this.playbackIndex = 0
    this.initHistoricalBuffer()
  }

  initHistoricalBuffer() {
    const now = Date.now()
    const oneHourMs = 60 * 60 * 1000

    // Pre-populate 24h of realistic historical IoT snapshots
    for (let i = 24; i >= 0; i--) {
      const timestamp = new Date(now - i * oneHourMs)
      // Simulate daytime temperature & solar output curves
      const hour = timestamp.getHours()
      const solarFactor = hour >= 6 && hour <= 18 ? Math.sin(((hour - 6) / 12) * Math.PI) : 0
      const tempFactor = 20 + solarFactor * 3.5 + (Math.random() - 0.5)

      this.buffer.push({
        timestamp,
        hvacTemp: Number(tempFactor.toFixed(1)),
        occupancy: hour >= 8 && hour <= 18 ? Math.floor(60 + Math.random() * 40) : Math.floor(5 + Math.random() * 10),
        maxOccupancy: 120,
        powerKw: Number((10 + solarFactor * 12 + Math.random() * 2).toFixed(1)),
        solarGenerationKw: Number((solarFactor * 14.5).toFixed(1)),
        aqi: Math.floor(85 + Math.random() * 20),
        chillerStatus: 'Optimal',
        accessControl: 'Secured',
      })
    }
  }

  /**
   * Set playback time index (0 = 24 hours ago, 100 = Live Now)
   */
  scrubToPercentage(pct) {
    const clampedPct = Math.max(0, Math.min(100, pct))
    this.isLive = clampedPct === 100

    this.playbackIndex = Math.floor((clampedPct / 100) * (this.buffer.length - 1))
    const snapshot = this.buffer[this.playbackIndex]

    if (snapshot) {
      useTwinStore.getState().setTelemetryData(snapshot)
    }

    useTwinStore.getState().setTimeMachineState?.({
      isLive: this.isLive,
      playbackPct: clampedPct,
      activeTimestamp: snapshot ? snapshot.timestamp.toLocaleTimeString() : 'Live',
    })
  }

  resumeLive() {
    this.scrubToPercentage(100)
  }
}

export const timeMachine = new TimeMachine()
