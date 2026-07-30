import { useState } from 'react'
import { useTwinStore } from '../../store/useTwinStore'

export function TourBuilder() {
  const customTourWaypoints = useTwinStore((state) => state.customTourWaypoints)
  const addTourWaypoint = useTwinStore((state) => state.addTourWaypoint)
  const cameraMode = useTwinStore((state) => state.cameraMode)
  const setCameraMode = useTwinStore((state) => state.setCameraMode)

  const [caption, setCaption] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleCapture = () => {
    // In a real implementation, we would pull the exact current camera position/target
    // For this UI scaffolding, we simulate capturing the viewpoint.
    const mockWaypoint = {
      id: Date.now(),
      caption: caption || `Viewpoint ${customTourWaypoints.length + 1}`,
      duration: 4,
    }
    addTourWaypoint(mockWaypoint)
    setCaption('')
  }

  const handlePlay = () => {
    if (customTourWaypoints.length > 0) {
      setCameraMode('tour')
    } else {
      alert('Please add waypoints to your tour first.')
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          color: '#fff',
          padding: '10px 16px',
          borderRadius: '12px',
          backdropFilter: 'blur(8px)',
          cursor: 'pointer',
          zIndex: 1000,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span>🎬</span> Create Tour
      </button>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '320px',
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(59, 130, 246, 0.5)',
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
          <span>🎥</span> Tour Builder
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '16px' }}
        >
          ✕
        </button>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
          WAYPOINT CAPTION
        </label>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="e.g. Main Lobby Entrance"
          style={{
            width: '100%',
            padding: '10px',
            background: 'rgba(30, 41, 59, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '13px',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <button
        onClick={handleCapture}
        style={{
          width: '100%',
          padding: '10px',
          background: 'rgba(59, 130, 246, 0.2)',
          border: '1px solid #3b82f6',
          color: '#60a5fa',
          borderRadius: '8px',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: '16px',
        }}
      >
        📷 Capture Current View
      </button>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '12px' }}>
          TOUR TIMELINE ({customTourWaypoints.length} frames)
        </div>
        
        {customTourWaypoints.length > 0 ? (
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '12px' }}>
            {customTourWaypoints.map((wp, idx) => (
              <div
                key={wp.id}
                style={{
                  minWidth: '100px',
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {idx + 1}. {wp.caption}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px', fontStyle: 'italic' }}>
            No waypoints added yet.
          </div>
        )}

        <button
          onClick={handlePlay}
          disabled={customTourWaypoints.length === 0}
          style={{
            width: '100%',
            padding: '12px',
            background: customTourWaypoints.length > 0 ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : '#334155',
            border: 'none',
            color: '#fff',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: customTourWaypoints.length > 0 ? 'pointer' : 'not-allowed',
            opacity: customTourWaypoints.length > 0 ? 1 : 0.5,
          }}
        >
          ▶ Play Tour
        </button>
      </div>
    </div>
  )
}
