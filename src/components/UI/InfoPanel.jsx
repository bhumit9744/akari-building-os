import { useTwinStore } from '../../store/useTwinStore'

export function InfoPanel() {
  const infoPanelOpen = useTwinStore((state) => state.infoPanelOpen)
  const selectedNode = useTwinStore((state) => state.selectedNode)
  const activeFloor = useTwinStore((state) => state.activeFloor)

  if (!infoPanelOpen) return null

  return (
    <aside className="infopanel-container">
      <div className="panel-header">
        <h2>{selectedNode ? selectedNode.label || selectedNode.level : 'Campus Overview'}</h2>
        <span className="panel-badge">DIGITAL TWIN TELEMETRY</span>
      </div>

      <div className="panel-content">
        <div className="metric-card">
          <div className="metric-header">
            <span>ACTIVE FOCUS</span>
            <span className="metric-value">{activeFloor}</span>
          </div>
          <p className="metric-subtext">Level Filter Active</p>
        </div>

        <div className="metrics-grid">
          <div className="metric-box">
            <span className="box-title">HVAC Temp</span>
            <span className="box-value green">21.8 °C</span>
          </div>
          <div className="metric-box">
            <span className="box-title">Occupancy</span>
            <span className="box-value blue">84 / 120</span>
          </div>
          <div className="metric-box">
            <span className="box-title">Power Usage</span>
            <span className="box-value yellow">14.2 kW</span>
          </div>
          <div className="metric-box">
            <span className="box-title">Air Quality</span>
            <span className="box-value green">98 AQI</span>
          </div>
        </div>

        <div className="panel-section">
          <h3>Facility Status</h3>
          <ul className="status-list">
            <li>
              <span className="dot online"></span>
              <span>Main Chiller Units: <b>Optimal</b></span>
            </li>
            <li>
              <span className="dot online"></span>
              <span>Solar Roof Inverter: <b>9.4 kW Generating</b></span>
            </li>
            <li>
              <span className="dot online"></span>
              <span>Fire & Alarm Systems: <b>Armed</b></span>
            </li>
            <li>
              <span className="dot online"></span>
              <span>Access Control: <b>Secured</b></span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
