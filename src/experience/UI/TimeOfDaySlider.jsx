import { useState, useEffect } from 'react'
import { useTwinStore } from '../../store/useTwinStore'
import { timeController } from '../../engine/environment/TimeController'

export function TimeOfDaySlider() {
  const timeOfDay = useTwinStore((state) => state.timeOfDay)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleSlider = (e) => {
    const val = parseFloat(e.target.value)
    timeController.setTimeOfDay(val)
  }

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      useTwinStore.setState((state) => {
        const nextTime = (state.timeOfDay + 0.1) % 24
        timeController.setTimeOfDay(nextTime)
        return { timeOfDay: nextTime }
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying])

  const formattedTime = timeController.formatTime(timeOfDay)

  return (
    <div className="timeofday-bar">
      <button
        className="icon-btn"
        onClick={() => setIsPlaying(!isPlaying)}
        title={isPlaying ? 'Pause Sun Cycle' : 'Play 24H Sun Cycle'}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>

      <span className="sun-icon">
        {timeOfDay >= 6 && timeOfDay <= 18 ? '☀️' : '🌙'}
      </span>

      <span className="time-display">{formattedTime}</span>

      <input
        type="range"
        min="0"
        max="24"
        step="0.1"
        value={timeOfDay}
        onChange={handleSlider}
        className="sun-slider"
      />
    </div>
  )
}
