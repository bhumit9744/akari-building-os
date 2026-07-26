import { useEffect, useState } from 'react'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { assetManager } from './AssetManager'
import { Building } from '../../world/Building/Building'
import { useTwinStore } from '../../store/useTwinStore'

export function GLBModel({ url, targetSize = 30 }) {
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
        // Enable shadows on all child meshes
        scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        // Compute Bounding Box & Bounding Sphere Analysis
        const box = new THREE.Box3().setFromObject(scene)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        const sphere = box.getBoundingSphere(new THREE.Sphere())

        // Calculate Configurable Scale Factor
        const maxDim = Math.max(size.x, size.y, size.z)
        const scaleFactor = targetSize / (maxDim || 1)

        // Center X and Z at (0,0), and snap bottom of geometry to Y = 0 ground plane
        scene.position.x = -center.x * scaleFactor
        scene.position.y = -box.min.y * scaleFactor
        scene.position.z = -center.z * scaleFactor

        scene.scale.set(scaleFactor, scaleFactor, scaleFactor)

        // Store Normalized Asset Metadata on scene.userData & global store
        const assetInfo = {
          rawCenter: center,
          rawSize: size,
          size: {
            x: size.x * scaleFactor,
            y: size.y * scaleFactor,
            z: size.z * scaleFactor,
          },
          radius: sphere.radius * scaleFactor,
          scale: scaleFactor,
          targetSize,
          boundingBox: box,
          boundingSphere: sphere,
        }

        scene.userData.assetInfo = assetInfo
        useTwinStore.getState().setActiveAssetInfo?.(assetInfo)

        setModel(scene)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load GLB model:', err)
        setError(err)
        setLoading(false)
      })
  }, [url, targetSize])

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
          <span style={{ fontSize: '20px' }}>⚡</span>
          <span>Asset Normalization Pipeline ({progress}%)...</span>
        </div>
      </Html>
    )
  }

  if (!url || error) {
    return <Building />
  }

  if (!model) return null

  return <primitive object={model} />
}
