import { useTwinStore } from '../../store/useTwinStore'

function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.25, 2.4, 8]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} />
      </mesh>
      {/* Foliage Cone 1 */}
      <mesh position={[0, 2.8, 0]} castShadow>
        <coneGeometry args={[1.2, 2.2, 7]} />
        <meshStandardMaterial color="#047857" roughness={0.6} />
      </mesh>
      {/* Foliage Cone 2 */}
      <mesh position={[0, 4.0, 0]} castShadow>
        <coneGeometry args={[0.9, 1.8, 7]} />
        <meshStandardMaterial color="#10b981" roughness={0.5} />
      </mesh>
    </group>
  )
}

export function Trees() {
  const showTrees = useTwinStore((state) => state.showTrees)

  if (!showTrees) return null

  const treePositions = [
    // Front Entrance Line
    [-18, 0, 15],
    [-12, 0, 15],
    [12, 0, 15],
    [18, 0, 15],
    // Back Plaza Line
    [-18, 0, -15],
    [-10, 0, -15],
    [10, 0, -15],
    [18, 0, -15],
    // West Side Perimeter
    [-21, 0, -8],
    [-21, 0, 0],
    [-21, 0, 8],
    // East Side Perimeter
    [21, 0, -8],
    [21, 0, 0],
    [21, 0, 8],
  ]

  return (
    <group>
      {treePositions.map((pos, idx) => (
        <Tree key={idx} position={pos} scale={0.8 + (idx % 3) * 0.15} />
      ))}
    </group>
  )
}
