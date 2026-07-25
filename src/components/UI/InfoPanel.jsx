import { useEffect, useMemo } from 'react'
import { useTwinStore } from '../../store/useTwinStore'
import { telemetrySimulator } from '../../telemetry/simulator'
import { analyzeBuildingHealth } from '../../services/ai/aiAnalytics'

export function InfoPanel() {
  const infoPanelOpen = useTwinStore((state) => state.infoPanelOpen)
  const selectedNode = useTwinStore((state) => state.selectedNode)
  const activeFloor = useTwinStore((state) => state.activeFloor)
  const telemetry = useTwinStore((state) => state.telemetry)

  useEffect(() => {
    telemetrySimulator.start(2000)
    return () => telemetrySimulator.stop()
  }, [])

  // Analyze Building Health using AI Analytics Service
  const aiReport = useMemo(() => analyzeBuildingHealth(telemetry), [telemetry])

  if (!infoPanelOpen) return null

  return (
    <aside className="infopanel-container">
      <div className="panel-header">
        <h2>{selectedNode ? selectedNode.name || selectedNode.label : 'Campus Telemetry'}</h2>
        <span className="panel-badge">
          {selectedNode?.type ? selectedNode.type.toUpperCase() : 'LIVE IoT STREAM'}
        </span>
      </div>

      <div className="panel-content">
        {/* AI Health Score Card */}
        <div
          className="metric-card"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(6, 182, 212, 0.1))',
            borderColor: 'rgba(59, 130, 246, 0.3)',
          }}
        >
          <div className="metric-header">
            <span>🤖 AI BUILDING INSIGHTS</span>
            <span className="metric-value" style={{ color: '#38bdf8' }}>
              {aiReport.healthScore}% HEALTH
            </span>
          </div>
          {aiReport.anomalies.map((anom, idx) => (
            <p
              key={idx}
              style={{
                fontSize: '11px',
                color: anom.type === 'WARNING' ? '#fbbf24' : '#60a5fa',
                marginTop: '6px',
                lineHeight: '1.3',
              }}
            >
              💡 {anom.message}
            </p>
          ))}
        </div>

        {selectedNode ? (
          <div className="metric-card">
            <div className="metric-header">
              <span>STATUS</span>
              <span className="metric-value" style={{ color: '#34d399' }}>
                {selectedNode.status || 'Active'}
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px', lineHeight: '1.4' }}>
              {selectedNode.description || 'Facility node selected.'}
            </p>
            {selectedNode.lastMaintenance && (
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '8px' }}>
                📅 Last Maintenance: <b>{selectedNode.lastMaintenance}</b>
              </div>
            )}
          </div>
        ) : (
          <div className="metric-card">
            <div className="metric-header">
              <span>ACTIVE FOCUS</span>
              <span className="metric-value">{activeFloor === 'all' ? 'All Floors' : activeFloor}</span>
            </div>
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
              Select a floor or 3D hotspot node to inspect metadata.
            </p>
          </div>
        )}

        <div className="metrics-grid">
          <div className="metric-box">
            <span className="box-title">HVAC Temp</span>
            <span className="box-value green">
              {selectedNode?.temperature ? `${selectedNode.temperature} °C` : `${telemetry.hvacTemp} °C`}
            </span>
          </div>
          <div className="metric-box">
            <span className="box-title">Occupancy</span>
            <span className="box-value blue">
              {selectedNode?.occupancy !== undefined
                ? `${selectedNode.occupancy} / ${selectedNode.maxCapacity || 50}`
                : `${telemetry.occupancy} / ${telemetry.maxOccupancy}`}
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
              <span>
                HVAC Unit: <b>{selectedNode?.hvacUnit || 'Chiller-01 (Optimal)'}</b>
              </span>
            </li>
            <li>
              <span className="dot online"></span>
              <span>
                Air Quality: <b>{telemetry.aqi} AQI</b>
              </span>
            </li>
            <li>
              <span className="dot online"></span>
              <span>
                Security: <b>{telemetry.accessControl}</b>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
