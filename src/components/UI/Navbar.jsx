import { useTwinStore } from '../../store/useTwinStore'
import { projectManager, CAMPUS_REGISTRY } from '../../services/projects/ProjectManager'
import { cameraDirector } from '../../engine/camera/CameraDirector'

export function Navbar() {
  const cameraMode = useTwinStore((state) => state.cameraMode)
  const setCameraMode = useTwinStore((state) => state.setCameraMode)
  const setSelectedNode = useTwinStore((state) => state.setSelectedNode)
  const activeCampus = useTwinStore((state) => state.activeCampus)
  const sidebarOpen = useTwinStore((state) => state.sidebarOpen)
  const toggleSidebar = useTwinStore((state) => state.toggleSidebar)
  const infoPanelOpen = useTwinStore((state) => state.infoPanelOpen)
  const toggleInfoPanel = useTwinStore((state) => state.toggleInfoPanel)
  const toggleAICopilot = useTwinStore((state) => state.toggleAICopilot)

  const handleModeChange = (mode) => {
    setSelectedNode(null)
    setCameraMode(mode)
  }

  const handleCampusChange = (e) => {
    projectManager.loadCampus(e.target.value)
  }

  const handleStartPresentation = () => {
    cameraDirector.startCinematicTour()
  }

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
            <span className="brand-subtitle">Digital Twin Engine v3.5</span>
          </div>
        </div>

        {/* Multi-Campus Selector */}
        <select
          value={activeCampus.id}
          onChange={handleCampusChange}
          className="campus-select"
        >
          {Object.values(CAMPUS_REGISTRY).map((c) => (
            <option key={c.id} value={c.id}>
              📍 {c.name} ({c.location})
            </option>
          ))}
        </select>
      </div>

      <div className="navbar-center">
        <div className="camera-presets">
          <button
            className={`preset-btn ${cameraMode === 'orbit' ? 'active' : ''}`}
            onClick={() => handleModeChange('orbit')}
          >
            Orbit
          </button>
          <button
            className={`preset-btn ${cameraMode === 'firstPerson' ? 'active' : ''}`}
            onClick={() => handleModeChange('firstPerson')}
          >
            🚶 Walk
          </button>
          <button
            className={`preset-btn ${cameraMode === 'top' ? 'active' : ''}`}
            onClick={() => handleModeChange('top')}
          >
            Top GIS
          </button>
          <button
            className={`preset-btn ${cameraMode === 'front' ? 'active' : ''}`}
            onClick={() => handleModeChange('front')}
          >
            Elevation
          </button>
          <button className="demo-btn" onClick={handleStartPresentation}>
            🎬 Presentation Demo
          </button>
        </div>
      </div>

      <div className="navbar-right">
        <button className="copilot-btn" onClick={useTwinStore((state) => state.toggleConfigurator)} style={{ marginRight: '8px', background: '#334155' }}>
          🎨 Configurator
        </button>
        <button className="copilot-btn" onClick={useTwinStore((state) => state.toggleShareModal)} style={{ marginRight: '8px', background: '#2563eb' }}>
          🔗 Share
        </button>
        <button className="copilot-btn" onClick={toggleAICopilot}>
          🤖 AI Copilot
        </button>
        <div className="status-badge">
          <span className="status-dot"></span>
          <span>CINEMATIC LIVE</span>
        </div>
        <button className="icon-btn" onClick={toggleInfoPanel} title="Toggle Info Drawer">
          {infoPanelOpen ? '▶' : '◀'}
        </button>
      </div>
    </header>
  )
}
