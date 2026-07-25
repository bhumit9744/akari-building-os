import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraController } from '../Camera/CameraController'
import { SceneLighting } from '../Lighting/SceneLighting'
import { PostProcessing } from './PostProcessing'
import { PerformanceStats } from '../../engine/performance/PerformanceStats'
import { SectionClipping } from '../../engine/renderer/SectionClipping'
import { GLBModel } from '../../engine/loaders/GLBModel'
import { Ground } from '../../world/Ground/Ground'
import { Roads } from '../../world/Roads/Roads'
import { Trees } from '../../world/Trees/Trees'
import { Hotspots } from '../../world/Hotspots/Hotspots'
import { Annotations } from '../../world/Annotations/Annotations'
import { CanvasErrorBoundary } from './CanvasErrorBoundary'

export function TwinCanvas() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <CanvasErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [25, 20, 30], fov: 45 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#090d16']} />
          <Suspense fallback={null}>
            <PerformanceStats />
            <SectionClipping />
            <SceneLighting />
            <Ground />
            <Roads />
            <Trees />
            <GLBModel url="/models/building.glb" />
            <Hotspots />
            <Annotations />
            <CameraController />
            <PostProcessing />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  )
}
