import { useTwinStore } from '../../store/useTwinStore'

export function Navbar() {
  const cameraMode = useTwinStore((state) => state.cameraMode)
  const setCameraMode = useTwinStore((state) => state.setCameraMode)
  const sidebarOpen = useTwinStore((state) => state.sidebarOpen)
  const toggleSidebar = useTwinStore((state) => state.toggleSidebar)
  const infoPanelOpen = useTwinStore((state) => state.infoPanelOpen)
  const toggleInfoPanel = useTwinStore((state) => state.toggleInfoPanel)

  return (
    <header className="navbar-container">
      <div className="navbar-left">
        <button className="icon-btn" onClick={toggleSidebar} title="Toggle Sidebar">
          {sidebarOpen ? '◀' : '▶'}
        </button>
        <div className="brand">
          <span className="brand-logo">🌌</span>
          <div className="brand-text">
            <h1 className="brand-title">AKARI</h1>
            <span className="brand-subtitle">Digital Twin Engine v1.0</span>
          </div>
        </div>
      </div>

      <div className="navbar-center">
        <div className="camera-presets">
          <button
            className={`preset-btn ${cameraMode === 'orbit' ? 'active' : ''}`}
            onClick={() => setCameraMode('orbit')}
          >
            Orbit
          </button>
          <button
            className={`preset-btn ${cameraMode === 'top' ? 'active' : ''}`}
            onClick={() => setCameraMode('top')}
          >
            Top GIS
          </button>
          <button
            className={`preset-btn ${cameraMode === 'front' ? 'active' : ''}`}
            onClick={() => setCameraMode('front')}
          >
            Elevation
          </button>
        </div>
      </div>

      <div className="navbar-right">
        <div className="status-badge">
          <span className="status-dot"></span>
          <span>LIVE TELEMETRY</span>
        </div>
        <button className="icon-btn" onClick={toggleInfoPanel} title="Toggle Info Drawer">
          {infoPanelOpen ? '▶' : '◀'}
        </button>
      </div>
    </header>
  )
}
