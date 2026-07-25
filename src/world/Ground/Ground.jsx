import { Grid } from '@react-three/drei'
import { useTwinStore } from '../../store/useTwinStore'

export function Ground() {
  const showGrid = useTwinStore((state) => state.showGrid)

  return (
    <group position={[0, -0.05, 0]}>
      {/* Grass Ground Plane */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} rotation={[-Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#0b1329" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Main Campus Concrete Slab */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[46, 0.2, 36]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.3} />
      </mesh>

      {/* Spatial Grid */}
      {showGrid && (
        <Grid
          position={[0, 0.08, 0]}
          args={[70, 70]}
          cellSize={1}
          cellThickness={0.8}
          cellColor="#334155"
          sectionSize={5}
          sectionThickness={1.5}
          sectionColor="#3b82f6"
          fadeDistance={65}
          fadeStrength={1.5}
        />
      )}
    </group>
  )
}
