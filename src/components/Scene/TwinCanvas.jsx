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

import { useTwinStore } from '../../store/useTwinStore'
import { FirstPersonControls } from '../../engine/controls/FirstPersonControls'

export function TwinCanvas() {
  const cameraMode = useTwinStore((state) => state.cameraMode)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <CanvasErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [25, 20, 30], fov: 45, near: 0.1, far: 1000 }}
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
            {cameraMode === 'firstPerson' && <FirstPersonControls />}
            <PostProcessing />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  )
}
