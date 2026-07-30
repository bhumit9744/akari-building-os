import { useTwinStore } from '../../store/useTwinStore'

export function MaterialConfigurator() {
  const configuratorOpen = useTwinStore((state) => state.configuratorOpen)
  const toggleConfigurator = useTwinStore((state) => state.toggleConfigurator)
  const materialOverrides = useTwinStore((state) => state.materialOverrides)
  const setMaterialOverride = useTwinStore((state) => state.setMaterialOverride)

  if (!configuratorOpen) return null

  const wallColors = [
    { name: 'Nordic White', hex: '#f8fafc' },
    { name: 'Warm Terracotta', hex: '#e07a5f' },
    { name: 'Charcoal Slate', hex: '#334155' },
    { name: 'Sage Green', hex: '#81b29a' },
    { name: 'Midnight Blue', hex: '#1e3a8a' },
  ]

  const floorFinishes = [
    { id: 'wood', label: '🪵 Natural Oak Hardwood' },
    { id: 'marble', label: '🏛️ Carrara White Marble' },
    { id: 'concrete', label: '🏗️ Polish Industrial Concrete' },
  ]

  return (
    <div
      style={{
        position: 'fixed',
        right: '24px',
        top: '80px',
        width: '320px',
        background: 'rgba(15, 23, 42, 0.92)',
        border: '1px solid rgba(59, 130, 246, 0.4)',
        borderRadius: '16px',
        padding: '20px',
        color: '#fff',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        backdropFilter: 'blur(16px)',
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🎨</span> Material Configurator
        </h3>
        <button
          onClick={toggleConfigurator}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '16px' }}
        >
          ✕
        </button>
      </div>

      {/* Wall Paint Swatches */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
          WALL PAINT FINISH
        </label>
        <div style={{ display: 'flex', gap: '10px' }}>
          {wallColors.map((c) => {
            const isSelected = materialOverrides.wallColor === c.hex
            return (
              <button
                key={c.hex}
                onClick={() => setMaterialOverride('wallColor', c.hex)}
                title={c.name}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: c.hex,
                  border: isSelected ? '3px solid #3b82f6' : '1px solid rgba(255,255,255,0.3)',
                  boxShadow: isSelected ? '0 0 12px rgba(59,130,246,0.8)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Flooring Material Presets */}
      <div>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
          FLOORING SELECTION
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {floorFinishes.map((f) => {
            const isSelected = materialOverrides.floorMaterial === f.id
            return (
              <button
                key={f.id}
                onClick={() => setMaterialOverride('floorMaterial', f.id)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: isSelected ? 'rgba(59, 130, 246, 0.25)' : 'rgba(30, 41, 59, 0.6)',
                  border: isSelected ? '1px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: isSelected ? '#60a5fa' : '#cbd5e1',
                  fontSize: '13px',
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {f.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
