import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraController } from '../Camera/CameraController'
import { SceneLighting } from '../Lighting/SceneLighting'
import { BuildingScene } from '../Building/BuildingScene'

export function TwinCanvas() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Canvas
        shadows
        camera={{ position: [22, 18, 25], fov: 45 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#090d16']} />
        <Suspense fallback={null}>
          <SceneLighting />
          <BuildingScene />
          <CameraController />
        </Suspense>
      </Canvas>
    </div>
  )
}
