import { useMemo } from 'react'
import { Sky, Stars } from '@react-three/drei'
import { useTwinStore } from '../../store/useTwinStore'
import { timeController } from './TimeController'

export function SkySystem() {
  const timeOfDay = useTwinStore((state) => state.timeOfDay)
  const showShadows = useTwinStore((state) => state.showShadows)

  const solar = useMemo(
    () => timeController.calculateSolarPosition(timeOfDay),
    [timeOfDay],
  )

  return (
    <>
      {/* Sky Sun Sphere */}
      <Sky
        sunPosition={solar.sunPosition}
        turbidity={solar.isNight ? 0.1 : 8}
        rayleigh={solar.isNight ? 0.2 : 2}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* Atmospheric Fog */}
      <fog attach="fog" args={[solar.isNight ? '#090d16' : '#64748b', 30, 160]} />

      {/* Night Sky Stars */}
      {solar.isNight && (
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      )}

      {/* Dynamic Sun Light */}
      <directionalLight
        position={solar.sunPosition}
        intensity={solar.sunIntensity}
        castShadow={showShadows}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        color={solar.timeOfDay < 7 || solar.timeOfDay > 17 ? '#f97316' : '#ffffff'}
      />

      {/* Night Moon Light */}
      {solar.isNight && (
        <directionalLight
          position={[-30, 40, -20]}
          intensity={0.4}
          color="#93c5fd"
        />
      )}

      <ambientLight intensity={solar.ambientIntensity} />
    </>
  )
}
