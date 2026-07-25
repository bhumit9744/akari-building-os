import { useEffect, useState } from 'react'
import { assetManager } from './AssetManager'
import { Building } from '../../world/Building/Building'

export function GLBModel({ url, position = [0, 0, 0], scale = [1, 1, 1] }) {
  const [model, setModel] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    setLoading(true)
    assetManager
      .loadGLTF(url)
      .then((scene) => {
        setModel(scene)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [url])

  if (!url || error) {
    // Default Fallback to Procedural 3D Building Tower
    return <Building />
  }

  if (loading || !model) {
    return null
  }

  return <primitive object={model} position={position} scale={scale} />
}
