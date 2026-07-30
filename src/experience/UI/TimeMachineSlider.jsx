import { useState } from 'react'
import { timeMachine } from '../../telemetry/timeMachine'

export function TimeMachineSlider() {
  const [playbackPct, setPlaybackPct] = useState(100)
  const isLive = playbackPct === 100

  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value)
    setPlaybackPct(val)
    timeMachine.scrubToPercentage(val)
  }

  const handleResumeLive = () => {
    setPlaybackPct(100)
    timeMachine.resumeLive()
  }

  return (
    <div className="timemachine-container">
      <div className="timemachine-left">
        <span className="timemachine-icon">⏳</span>
        <div>
          <div className="timemachine-title">TELEMETRY TIME MACHINE</div>
          <div className="timemachine-sub">
            {isLive ? '🔴 LIVE REALTIME FEED' : `⏪ REPLAYING SNAPSHOT (-${Math.round(24 * (1 - playbackPct / 100))} Hours Ago)`}
          </div>
        </div>
      </div>

      <div className="timemachine-center">
        <span className="time-label">-24 Hours</span>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={playbackPct}
          onChange={handleSliderChange}
          className="time-slider"
        />
        <span className="time-label">NOW</span>
      </div>

      <div className="timemachine-right">
        {!isLive && (
          <button className="live-btn" onClick={handleResumeLive}>
            ▶ Resume Live
          </button>
        )}
      </div>
    </div>
  )
}
