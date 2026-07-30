import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function HvacFan({ position }) {
  const fanRef = useRef()

  useFrame((_, delta) => {
    if (fanRef.current) {
      fanRef.current.rotation.y += delta * 6
    }
  })

  return (
    <group position={position}>
      {/* Chiller Unit Housing */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.8, 0.8, 1.8]} />
        <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Rotating Fan Blades */}
      <group ref={fanRef} position={[0, 0.82, 0]}>
        <mesh>
          <boxGeometry args={[1.4, 0.04, 0.2]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.4, 0.04, 0.2]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>
    </group>
  )
}

export function AmbientAnimations() {
  return (
    <group>
      {/* Rooftop HVAC Chiller Fans */}
      <HvacFan position={[-6, 11.8, -4]} />
      <HvacFan position={[-3.8, 11.8, -4]} />
    </group>
  )
}
