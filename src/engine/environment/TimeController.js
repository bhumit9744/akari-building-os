import { useTwinStore } from '../../store/useTwinStore'

/**
 * 24-Hour Solar & Atmospheric Calculation Engine
 */
class TimeController {
  /**
   * Calculates sun position vector [x, y, z] and lighting properties for a given hour (0.0 to 24.0)
   */
  calculateSolarPosition(timeOfDay) {
    // 06:00 = Sunrise (0°), 12:00 = Noon (90°), 18:00 = Sunset (180°), 24:00 = Midnight (270°)
    const angleRad = ((timeOfDay - 6) / 12) * Math.PI
    const distance = 80

    const x = Math.cos(angleRad) * distance
    const y = Math.sin(angleRad) * distance
    const z = 20

    const isNight = timeOfDay < 5.5 || timeOfDay > 18.5
    const sunIntensity = isNight ? 0 : Math.max(0.1, Math.sin(angleRad) * 1.8)
    const ambientIntensity = isNight ? 0.15 : 0.3 + Math.sin(angleRad) * 0.45

    // Environment preset matching time of day
    let preset = 'city'
    if (timeOfDay >= 5 && timeOfDay < 7) preset = 'dawn'
    else if (timeOfDay >= 7 && timeOfDay < 17) preset = 'city'
    else if (timeOfDay >= 17 && timeOfDay < 19) preset = 'sunset'
    else preset = 'night'

    return {
      sunPosition: [x, Math.max(-10, y), z],
      isNight,
      sunIntensity,
      ambientIntensity,
      preset,
      formattedTime: this.formatTime(timeOfDay),
    }
  }

  formatTime(timeDecimal) {
    const hours = Math.floor(timeDecimal)
    const mins = Math.floor((timeDecimal % 1) * 60)
    const hh = String(hours).padStart(2, '0')
    const mm = String(mins).padStart(2, '0')
    return `${hh}:${mm}`
  }

  setTimeOfDay(time) {
    const clampedTime = Math.max(0, Math.min(24, time))
    const solar = this.calculateSolarPosition(clampedTime)

    useTwinStore.getState().setTimeOfDayState?.({
      timeOfDay: clampedTime,
      solar,
    })
  }
}

export const timeController = new TimeController()
