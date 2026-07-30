export function Roads() {
  return (
    <group position={[0, 0, 0]}>
      {/* Perimeter Road Ring */}
      {/* North Road */}
      <mesh position={[0, 0.01, -22]} receiveShadow>
        <planeGeometry args={[56, 6]} rotation={[-Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      {/* South Road */}
      <mesh position={[0, 0.01, 22]} receiveShadow>
        <planeGeometry args={[56, 6]} rotation={[-Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      {/* East Road */}
      <mesh position={[26, 0.01, 0]} receiveShadow>
        <planeGeometry args={[6, 50]} rotation={[-Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      {/* West Road */}
      <mesh position={[-26, 0.01, 0]} receiveShadow>
        <planeGeometry args={[6, 50]} rotation={[-Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>

      {/* Sidewalk Borders */}
      <mesh position={[0, 0.04, -18.5]} receiveShadow>
        <boxGeometry args={[48, 0.08, 1]} />
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.04, 18.5]} receiveShadow>
        <boxGeometry args={[48, 0.08, 1]} />
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </mesh>

      {/* Lane Centerlines */}
      <mesh position={[0, 0.02, -22]}>
        <planeGeometry args={[40, 0.2]} rotation={[-Math.PI / 2, 0, 0]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[0, 0.02, 22]}>
        <planeGeometry args={[40, 0.2]} rotation={[-Math.PI / 2, 0, 0]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
    </group>
  )
}
