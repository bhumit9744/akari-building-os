import { useTwinStore } from '../../store/useTwinStore'

export function HotspotModal() {
  const activeHotspotMedia = useTwinStore((state) => state.activeHotspotMedia)
  const setActiveHotspotMedia = useTwinStore((state) => state.setActiveHotspotMedia)

  if (!activeHotspotMedia) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
      }}
      onClick={() => setActiveHotspotMedia(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '540px',
          maxHeight: '85vh',
          background: 'rgba(15, 23, 42, 0.96)',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          borderRadius: '20px',
          padding: '24px',
          color: '#fff',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
            {activeHotspotMedia.label || activeHotspotMedia.name}
          </h2>
          <button
            onClick={() => setActiveHotspotMedia(null)}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '18px' }}
          >
            ✕
          </button>
        </div>

        {/* Feature Image Banner */}
        <div
          style={{
            width: '100%',
            height: '220px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ textAlign: 'center', color: '#60a5fa' }}>
            <div style={{ fontSize: '42px', marginBottom: '8px' }}>🏢</div>
            <div style={{ fontSize: '12px', fontWeight: 600 }}>INTERACTIVE 3D SPECIFICATION SHEET</div>
          </div>
        </div>

        <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
          {activeHotspotMedia.description || 'High-performance architectural node with real-time IoT integration.'}
        </p>

        {/* Specification Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '24px',
            background: 'rgba(30, 41, 59, 0.5)',
            padding: '14px',
            borderRadius: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>OPERATIONAL TEMP</div>
            <div style={{ fontSize: '15px', color: '#38bdf8', fontWeight: 700 }}>{activeHotspotMedia.temp || '22.4 °C'}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>STATUS</div>
            <div style={{ fontSize: '15px', color: '#4ade80', fontWeight: 700 }}>Optimal</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => alert('Spec sheet PDF downloaded!')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              background: 'rgba(59, 130, 246, 0.2)',
              border: '1px solid #3b82f6',
              color: '#60a5fa',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            📄 Download Spec Sheet
          </button>
          <button
            onClick={() => alert('Consultation request sent!')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              border: 'none',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            💬 Book Consultation
          </button>
        </div>
      </div>
    </div>
  )
}
