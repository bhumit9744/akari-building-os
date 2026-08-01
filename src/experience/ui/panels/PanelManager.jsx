import { useTwinStore } from '../../../store/useTwinStore'

// Import the legacy panels temporarily until they are redesigned
import { TimeOfDaySlider } from '../../UI/TimeOfDaySlider'
import { MaterialConfigurator } from '../../Materials/MaterialConfigurator'
import { ShareModal } from '../../ShareExport/ShareModal'

export function PanelManager() {
  const activePanel = useTwinStore((state) => state.activePanel)

  if (!activePanel) return null

  return (
    <div 
      className="panel-manager"
      style={{
        position: 'absolute',
        top: '120px', // Below the topbar
        right: 'var(--spacing-md)',
        width: '320px',
        maxHeight: 'calc(100vh - 220px)',
        pointerEvents: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)',
      }}
    >
      {/* 
        For Sprint 3 MVP, we just render the legacy components if the panel is active.
        We wrap them to ensure they behave within the new layout constraints.
      */}
      {activePanel === 'environment' && (
        <div style={{ position: 'relative' }}>
          {/* Override the legacy absolute positioning for the TimeOfDaySlider so it flows correctly in this flex container */}
          <style>{`
            .timeofday-bar { position: relative !important; top: 0 !important; left: 0 !important; width: 100%; border-radius: var(--radius-md) !important; }
          `}</style>
          <TimeOfDaySlider />
        </div>
      )}

      {activePanel === 'materials' && (
        <div style={{ position: 'relative', background: 'var(--panel-bg)', backdropFilter: 'blur(16px)', borderRadius: 'var(--radius-md)', padding: '16px', border: '1px solid var(--panel-border)' }}>
           <h3 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px' }}>Materials</h3>
           {/* Legacy Material Configurator renders absolute floating stuff, so we may need to adjust it later, but this restores access */}
           <MaterialConfigurator />
        </div>
      )}

      {activePanel === 'share' && (
        <div style={{ position: 'relative' }}>
           {/* The ShareModal has a fixed overlay, so rendering it anywhere works since it portals or overlays the screen */}
           <ShareModal />
        </div>
      )}
      
      {activePanel === 'measure' && (
        <div className="glass-panel" style={{ padding: '16px', borderRadius: 'var(--radius-md)' }}>
           <h3 style={{ fontSize: '13px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Measurement Tool</h3>
           <p style={{ fontSize: '12px', color: 'var(--text-main)', marginTop: '8px' }}>Select two points on the model to measure distance.</p>
        </div>
      )}
    </div>
  )
}
