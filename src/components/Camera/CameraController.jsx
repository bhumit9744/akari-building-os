import { useRef, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useTwinStore } from '../../store/useTwinStore'

export function CameraController() {
  const controlsRef = useRef()
  const { camera } = useThree()
  const cameraMode = useTwinStore((state) => state.cameraMode)

  useEffect(() => {
    if (!controlsRef.current) return

    if (cameraMode === 'top') {
      camera.position.set(0, 45, 0)
      controlsRef.current.target.set(0, 0, 0)
    } else if (cameraMode === 'front') {
      camera.position.set(0, 10, 35)
      controlsRef.current.target.set(0, 5, 0)
    } else if (cameraMode === 'orbit') {
      camera.position.set(22, 18, 25)
      controlsRef.current.target.set(0, 5, 0)
    }
    controlsRef.current.update()
  }, [cameraMode, camera])

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2 - 0.02} // Keep camera above ground plane
      minDistance={5}
      maxDistance={120}
      makeDefault
    />
  )
}
