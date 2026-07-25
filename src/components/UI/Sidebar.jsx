import { useTwinStore } from '../../store/useTwinStore'

export function Sidebar() {
  const sidebarOpen = useTwinStore((state) => state.sidebarOpen)
  const showGrid = useTwinStore((state) => state.showGrid)
  const toggleGrid = useTwinStore((state) => state.toggleGrid)
  const showShadows = useTwinStore((state) => state.showShadows)
  const toggleShadows = useTwinStore((state) => state.toggleShadows)
  const showHotspots = useTwinStore((state) => state.showHotspots)
  const toggleHotspots = useTwinStore((state) => state.toggleHotspots)
  const showTrees = useTwinStore((state) => state.showTrees)
  const toggleTrees = useTwinStore((state) => state.toggleTrees)
  const wireframeMode = useTwinStore((state) => state.wireframeMode)
  const toggleWireframe = useTwinStore((state) => state.toggleWireframe)
  const activeFloor = useTwinStore((state) => state.activeFloor)
  const setActiveFloor = useTwinStore((state) => state.setActiveFloor)
  const environmentPreset = useTwinStore((state) => state.environmentPreset)
  const setEnvironmentPreset = useTwinStore((state) => state.setEnvironmentPreset)

  if (!sidebarOpen) return null

  const floors = ['all', 'L1', 'L2', 'L3', 'Roof']
  const presets = ['city', 'night', 'sunset', 'dawn']

  return (
    <aside className="sidebar-container">
      <div className="sidebar-section">
        <h3>Building Floors</h3>
        <div className="floor-grid">
          {floors.map((floor) => (
            <button
              key={floor}
              className={`floor-btn ${activeFloor === floor ? 'active' : ''}`}
              onClick={() => setActiveFloor(floor)}
            >
              {floor === 'all' ? 'All Floors' : floor}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Viewport Layers</h3>
        <label className="toggle-row">
          <span>Spatial Grid</span>
          <input type="checkbox" checked={showGrid} onChange={toggleGrid} />
        </label>
        <label className="toggle-row">
          <span>Shadow Engine</span>
          <input type="checkbox" checked={showShadows} onChange={toggleShadows} />
        </label>
        <label className="toggle-row">
          <span>3D Hotspots</span>
          <input type="checkbox" checked={showHotspots} onChange={toggleHotspots} />
        </label>
        <label className="toggle-row">
          <span>Campus Foliage</span>
          <input type="checkbox" checked={showTrees} onChange={toggleTrees} />
        </label>
        <label className="toggle-row">
          <span>Wireframe X-Ray</span>
          <input type="checkbox" checked={wireframeMode} onChange={toggleWireframe} />
        </label>
      </div>

      <div className="sidebar-section">
        <h3>Environment HDRI</h3>
        <div className="env-selector">
          {presets.map((p) => (
            <button
              key={p}
              className={`env-btn ${environmentPreset === p ? 'active' : ''}`}
              onClick={() => setEnvironmentPreset(p)}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
