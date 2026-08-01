import { useTwinStore } from '../../../store/useTwinStore'

export function BottomToolbar() {
  const activePanel = useTwinStore((state) => state.activePanel)
  const setActivePanel = useTwinStore((state) => state.setActivePanel)

  const tools = [
    { id: 'walk', icon: '🚶', label: 'Walk' },
    { id: 'tour', icon: '🎥', label: 'Tour' },
    { id: 'materials', icon: '🎨', label: 'Materials' },
    { id: 'environment', icon: '☀', label: 'Environment' },
    { id: 'measure', icon: '📐', label: 'Measure' },
    { id: 'share', icon: '📤', label: 'Share' },
  ]

  return (
    <div 
      className="bottom-toolbar-container glass-panel"
      style={{
        position: 'absolute',
        bottom: 'var(--spacing-lg)',
        left: '50%',
        transform: 'translateX(-50%)',
        height: '64px',
        borderRadius: 'var(--radius-pill)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--spacing-sm)',
        gap: '4px',
        pointerEvents: 'auto'
      }}
    >
      {tools.map((tool) => {
        const isActive = activePanel === tool.id
        return (
          <button
            key={tool.id}
            className={`toolbar-btn ${isActive ? 'active' : ''}`}
            onClick={() => setActivePanel(tool.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              width: '72px',
              height: '52px',
              background: isActive ? 'var(--accent-blue)' : 'transparent',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              color: isActive ? '#fff' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.color = 'var(--text-main)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--text-muted)'
              }
            }}
          >
            <span style={{ fontSize: '18px' }}>{tool.icon}</span>
            <span style={{ fontSize: '10px', fontWeight: 600 }}>{tool.label}</span>
          </button>
        )
      })}
    </div>
  )
}
