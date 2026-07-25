import { useEffect } from 'react'
import { useTwinStore } from '../../store/useTwinStore'
import { telemetrySimulator } from '../../telemetry/simulator'

export function InfoPanel() {
  const infoPanelOpen = useTwinStore((state) => state.infoPanelOpen)
  const selectedNode = useTwinStore((state) => state.selectedNode)
  const activeFloor = useTwinStore((state) => state.activeFloor)
  const telemetry = useTwinStore((state) => state.telemetry)

  useEffect(() => {
    // Start live IoT telemetry simulator stream
    telemetrySimulator.start(2000)
    return () => telemetrySimulator.stop()
  }, [])

  if (!infoPanelOpen) return null

  return (
    <aside className="infopanel-container">
      <div className="panel-header">
        <h2>{selectedNode ? selectedNode.label || selectedNode.level : 'Campus Telemetry'}</h2>
        <span className="panel-badge">LIVE IoT STREAM</span>
      </div>

      <div className="panel-content">
        <div className="metric-card">
          <div className="metric-header">
            <span>ACTIVE FOCUS</span>
            <span className="metric-value">{activeFloor === 'all' ? 'All Floors' : activeFloor}</span>
          </div>
          {selectedNode?.description && (
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
              {selectedNode.description}
            </p>
          )}
        </div>

        <div className="metrics-grid">
          <div className="metric-box">
            <span className="box-title">HVAC Temp</span>
            <span className="box-value green">{telemetry.hvacTemp} °C</span>
          </div>
          <div className="metric-box">
            <span className="box-title">Occupancy</span>
            <span className="box-value blue">
              {telemetry.occupancy} / {telemetry.maxOccupancy}
            </span>
          </div>
          <div className="metric-box">
            <span className="box-title">Grid Draw</span>
            <span className="box-value yellow">{telemetry.powerKw} kW</span>
          </div>
          <div className="metric-box">
            <span className="box-title">Solar Gen</span>
            <span className="box-value green">{telemetry.solarGenerationKw} kW</span>
          </div>
        </div>

        <div className="panel-section">
          <h3>Facility Status</h3>
          <ul className="status-list">
            <li>
              <span className="dot online"></span>
              <span>Chiller Units: <b>{telemetry.chillerStatus}</b></span>
            </li>
            <li>
              <span className="dot online"></span>
              <span>Air Quality Index: <b>{telemetry.aqi} AQI</b></span>
            </li>
            <li>
              <span className="dot online"></span>
              <span>Access Control: <b>{telemetry.accessControl}</b></span>
            </li>
            <li>
              <span className="dot online"></span>
              <span>Fire Security: <b>Armed & Normal</b></span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
