import { useState } from 'react'
import { Html } from '@react-three/drei'
import { useTwinStore } from '../../store/useTwinStore'

export function Annotations() {
  const showAnnotations = useTwinStore((state) => state.showAnnotations)
  const annotations = useTwinStore((state) => state.annotations)
  const [activeAnn, setActiveAnn] = useState(null)

  if (!showAnnotations) return null

  return (
    <group>
      {annotations.map((ann) => {
        const isOpen = activeAnn?.id === ann.id
        const badgeColor = ann.severity === 'HIGH' ? '#ef4444' : ann.severity === 'MEDIUM' ? '#f59e0b' : '#3b82f6'

        return (
          <Html key={ann.id} position={ann.position} center>
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setActiveAnn(isOpen ? null : ann)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: badgeColor,
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: '16px',
                  fontSize: '11px',
                  fontWeight: 700,
                  boxShadow: `0 0 14px ${badgeColor}`,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>💬</span>
                <span>{ann.title}</span>
              </div>

              {isOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '28px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '240px',
                    background: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#fff',
                    fontSize: '11px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(12px)',
                    zIndex: 100,
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '12px', marginBottom: '4px' }}>{ann.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '10px', marginBottom: '6px' }}>
                    Author: {ann.author} • {ann.date}
                  </div>
                  <p style={{ lineHeight: '1.4', color: '#cbd5e1' }}>{ann.comments}</p>
                </div>
              )}
            </div>
          </Html>
        )
      })}
    </group>
  )
}
