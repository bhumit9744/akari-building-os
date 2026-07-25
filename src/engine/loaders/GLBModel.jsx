import { useEffect, useState } from 'react'
import { Html } from '@react-three/drei'
import { assetManager } from './AssetManager'
import { Building } from '../../world/Building/Building'

export function GLBModel({ url, position = [0, 0, 0], scale = [1, 1, 1] }) {
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
      <Html center>
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(59, 130, 246, 0.5)',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '10px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: '18px' }}>📦</span>
          <span>Loading GLB Model ({progress}%)...</span>
        </div>
      </Html>
    )
  }

  if (!url || error) {
    // Default Fallback to Procedural 3D Building Tower
    return <Building />
  }

  if (!model) return null

  return <primitive object={model} position={position} scale={scale} />
}
