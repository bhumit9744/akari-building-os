export function ResponsiveLayout({ children, uiLayer }) {
  return (
    <div className="responsive-layout" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* 3D Viewport Layer */}
      <div className="viewport-layer" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {children}
      </div>

      {/* UI Overlay Layer */}
      <div className="ui-layer" style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
        {uiLayer}
      </div>
    </div>
  )
}
