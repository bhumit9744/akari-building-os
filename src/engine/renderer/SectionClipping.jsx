import { useEffect } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { useTwinStore } from '../../store/useTwinStore'

// Shared module-level clipping plane facing downward (-Y direction)
export const globalClipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 8)

export function SectionClipping() {
  const { gl } = useThree()
  const clippingEnabled = useTwinStore((state) => state.clippingEnabled)
  const clippingHeight = useTwinStore((state) => state.clippingHeight)

  useEffect(() => {
    gl.localClippingEnabled = clippingEnabled
    if (clippingEnabled) {
      globalClipPlane.constant = clippingHeight
    }
  }, [gl, clippingEnabled, clippingHeight])

  if (!clippingEnabled) return null

  return (
    <mesh position={[0, clippingHeight, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[24, 20]} />
      <meshBasicMaterial
        color="#06b6d4"
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
