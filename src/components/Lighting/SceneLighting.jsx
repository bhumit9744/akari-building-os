import { Environment, ContactShadows } from '@react-three/drei'
import { useTwinStore } from '../../store/useTwinStore'

export function SceneLighting() {
  const showShadows = useTwinStore((state) => state.showShadows)
  const environmentPreset = useTwinStore((state) => state.environmentPreset)

  return (
    <>
      <ambientLight intensity={0.6} />

      <directionalLight
        position={[25, 40, 20]}
        intensity={1.4}
        castShadow={showShadows}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={-30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0001}
      />

      <directionalLight position={[-20, 15, -20]} intensity={0.4} color="#60a5fa" />

      <Environment preset={environmentPreset} background={false} />

      {showShadows && (
        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.6}
          scale={60}
          blur={1.8}
          far={10}
          resolution={1024}
          color="#000000"
        />
      )}
    </>
  )
}
