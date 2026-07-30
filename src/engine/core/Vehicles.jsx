import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTwinStore } from '../../store/useTwinStore'

function Vehicle({ startPos, direction, speed = 0.1, color = '#3b82f6' }) {
  const meshRef = useRef()
  const timeOfDay = useTwinStore((state) => state.timeOfDay)
  const isNight = timeOfDay < 5.5 || timeOfDay > 18.5

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.position.x += direction[0] * speed * delta * 60
    meshRef.current.position.z += direction[2] * speed * delta * 60

    // Loop roadway bounds
    if (meshRef.current.position.x > 26) meshRef.current.position.x = -26
    if (meshRef.current.position.x < -26) meshRef.current.position.x = 26
    if (meshRef.current.position.z > 24) meshRef.current.position.z = -24
    if (meshRef.current.position.z < -24) meshRef.current.position.z = 24
  })

  return (
    <group ref={meshRef} position={startPos}>
      {/* Vehicle Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[2.2, 0.8, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Cabin Glass */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[1.2, 0.5, 1.0]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Headlights (Emissive at night) */}
      {isNight && (
        <group position={[1.1, 0.6, 0]}>
          <spotLight
            position={[0.2, 0, 0.3]}
            target-position={[5, 0, 0.3]}
            intensity={2}
            angle={0.6}
            color="#fef08a"
          />
          <spotLight
            position={[0.2, 0, -0.3]}
            target-position={[5, 0, -0.3]}
            intensity={2}
            angle={0.6}
            color="#fef08a"
          />
        </group>
      )}
    </group>
  )
}

export function Vehicles() {
  return (
    <group>
      {/* North Road Traffic */}
      <Vehicle startPos={[-20, 0, -22]} direction={[1, 0, 0]} speed={0.12} color="#06b6d4" />
      <Vehicle startPos={[5, 0, -22]} direction={[1, 0, 0]} speed={0.09} color="#ef4444" />
      {/* South Road Traffic */}
      <Vehicle startPos={[20, 0, 22]} direction={[-1, 0, 0]} speed={0.14} color="#f59e0b" />
      <Vehicle startPos={[-10, 0, 22]} direction={[-1, 0, 0]} speed={0.1} color="#10b981" />
    </group>
  )
}
