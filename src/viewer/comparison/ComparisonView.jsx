export function ComparisonView() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(59, 130, 246, 0.5)',
        padding: '12px 24px',
        borderRadius: '30px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        zIndex: 1000,
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>OPTION A</span>
        <select style={{ background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '4px', padding: '4px 8px', outline: 'none' }}>
          <option>Nordic White Paint</option>
          <option>Charcoal Slate</option>
        </select>
      </div>
      
      <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.2)' }} />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>OPTION B</span>
        <select style={{ background: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '4px', padding: '4px 8px', outline: 'none' }}>
          <option>Natural Oak Floor</option>
          <option>Carrara Marble</option>
        </select>
      </div>
    </div>
  )
}
