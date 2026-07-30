import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraController } from '../../engine/navigation/CameraController'
import { PostProcessing } from './PostProcessing'
import { PerformanceStats } from '../../engine/performance/PerformanceStats'
import { SceneManager } from '../../engine/core/SceneManager'
import { CanvasErrorBoundary } from './CanvasErrorBoundary'
import { useTwinStore } from '../../store/useTwinStore'
import { FirstPersonControls } from '../../engine/navigation/FirstPersonControls'

export function Viewer() {
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
            <SceneManager />
            <CameraController />
            {cameraMode === 'firstPerson' && <FirstPersonControls />}
            <PostProcessing />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  )
}
