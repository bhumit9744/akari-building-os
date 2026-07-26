import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraController } from '../Camera/CameraController'
import { PostProcessing } from './PostProcessing'
import { PerformanceStats } from '../../engine/performance/PerformanceStats'
import { SectionClipping } from '../../engine/renderer/SectionClipping'
import { SkySystem } from '../../engine/environment/SkySystem'
import { HDRManager } from '../../engine/environment/HDRManager'
import { GLBModel } from '../../engine/loaders/GLBModel'
import { Ground } from '../../world/Ground/Ground'
import { Roads } from '../../world/Roads/Roads'
import { Trees } from '../../world/Trees/Trees'
import { Vehicles } from '../../world/Vehicles/Vehicles'
import { InteriorLighting } from '../../world/Lighting/InteriorLighting'
import { AmbientAnimations } from '../../world/Effects/AmbientAnimations'
import { Hotspots } from '../../world/Hotspots/Hotspots'
import { Annotations } from '../../world/Annotations/Annotations'
import { CanvasErrorBoundary } from './CanvasErrorBoundary'

export function TwinCanvas() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <CanvasErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [140, 90, 140], fov: 42, near: 0.1, far: 2000 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#090d16']} />
          <Suspense fallback={null}>
            <PerformanceStats />
            <SectionClipping />
            <SkySystem />
            <HDRManager />
            <Ground />
            <Roads />
            <Trees />
            <Vehicles />
            <InteriorLighting />
            <AmbientAnimations />
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
