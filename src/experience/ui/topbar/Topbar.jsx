import { useTwinStore } from '../../../store/useTwinStore'

export function Topbar() {
  const activeCampus = useTwinStore((state) => state.activeCampus)
  
  return (
    <div 
      className="topbar-container glass-panel"
      style={{
        position: 'absolute',
        top: 'var(--spacing-md)',
        left: 'var(--spacing-md)',
        right: 'var(--spacing-md)',
        height: '56px',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--spacing-md)',
        pointerEvents: 'auto'
      }}
    >
      <div className="topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="brand-logo" style={{ fontSize: '20px' }}>⛩️</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="brand-title" style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '1px', color: 'var(--text-main)', lineHeight: 1 }}>AKARI</span>
          </div>
        </div>
        
        <div style={{ width: '1px', height: '24px', background: 'var(--panel-border)', margin: '0 8px' }} />
        
        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)' }}>
          {activeCampus?.name || 'Project Name'}
        </span>
      </div>

      <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button className="topbar-btn">🔍 Search</button>
        <button className="topbar-btn">📤 Share</button>
        <div className="user-profile" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600, color: '#fff', cursor: 'pointer', marginLeft: '8px' }}>
          A
        </div>
      </div>
    </div>
  )
}
