import { useTwinStore } from '../../store/useTwinStore'

export function InteriorLighting() {
  const timeOfDay = useTwinStore((state) => state.timeOfDay)
  const isNight = timeOfDay < 5.5 || timeOfDay > 18.5

  if (!isNight) return null

  return (
    <group position={[0, 0, 0]}>
      {/* Ground Floor Lobby Warm Glow */}
      <pointLight
        position={[0, 2, 0]}
        intensity={3.5}
        color="#fbbf24"
        distance={25}
        decay={2}
      />

      {/* Level 2 NOC & Server Room Blue LED Glow */}
      <pointLight
        position={[3, 5.5, -2]}
        intensity={4.0}
        color="#3b82f6"
        distance={20}
        decay={2}
      />

      {/* Level 3 Executive Suite Ambient Interior Light */}
      <pointLight
        position={[-2, 9, 1]}
        intensity={2.8}
        color="#60a5fa"
        distance={22}
        decay={2}
      />

      {/* Perimeter Streetlamps along Sidewalks */}
      {[
        [-18, 4, 18.5],
        [0, 4, 18.5],
        [18, 4, 18.5],
        [-18, 4, -18.5],
        [0, 4, -18.5],
        [18, 4, -18.5],
      ].map((pos, idx) => (
        <spotLight
          key={idx}
          position={pos}
          target-position={[pos[0], 0, pos[2]]}
          intensity={3.0}
          angle={0.8}
          penumbra={0.5}
          color="#fef08a"
          castShadow
        />
      ))}
    </group>
  )
}
