import { useEffect, useState } from 'react'
import { Html } from '@react-three/drei'
import { assetManager } from './AssetManager'
import { Building } from '../../world/Building/Building'

export function GLBModel({
  url,
  position = [25, -12, 15],
  scale = [0.05, 0.05, 0.05],
}) {
  const [model, setModel] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    setLoading(true)
    assetManager
      .loadGLTF(url, (p) => setProgress(Math.round(p * 100)))
      .then((scene) => {
        scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        setModel(scene)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load GLB model:', err)
        setError(err)
        setLoading(false)
      })
  }, [url])

  if (loading) {
    return (
      <Html center position={[0, 5, 0]}>
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.92)',
            border: '1px solid rgba(59, 130, 246, 0.5)',
            color: '#fff',
            padding: '14px 24px',
            borderRadius: '12px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: '20px' }}>📦</span>
          <span>Loading Coastal Villa Asset ({progress}%)...</span>
        </div>
      </Html>
    )
  }

  if (!url || error) {
    return <Building />
  }

  if (!model) return null

  return <primitive object={model} position={position} scale={scale} />
}
