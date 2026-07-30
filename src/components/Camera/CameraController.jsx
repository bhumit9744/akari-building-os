import { useRef, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { useTwinStore } from '../../store/useTwinStore'

export function CameraController() {
  const controlsRef = useRef()
  const { camera } = useThree()
  const cameraMode = useTwinStore((state) => state.cameraMode)
  const selectedNode = useTwinStore((state) => state.selectedNode)
  const activeAssetInfo = useTwinStore((state) => state.activeAssetInfo)

  // Dynamic Camera Orbit Distance based on Bounding Sphere Radius
  const r = activeAssetInfo ? activeAssetInfo.radius : 18

  const animateCameraTo = (
    posX,
    posY,
    posZ,
    targetX = 0,
    targetY = r * 0.25,
    targetZ = 0,
    duration = 1.8,
  ) => {
    if (!controlsRef.current) return

    gsap.killTweensOf(camera.position)
    gsap.killTweensOf(controlsRef.current.target)

    gsap.to(camera.position, {
      x: posX,
      y: posY,
      z: posZ,
      duration: duration,
      ease: 'power3.inOut',
    })

    gsap.to(controlsRef.current.target, {
      x: targetX,
      y: targetY,
      z: targetZ,
      duration: duration,
      ease: 'power3.inOut',
      onUpdate: () => controlsRef.current?.update(),
    })
  }

  // Model-Independent Preset Views
  useEffect(() => {
    if (selectedNode) return

    if (cameraMode === 'top') {
      animateCameraTo(0, r * 2.8, 0.1, 0, 0, 0)
    } else if (cameraMode === 'front') {
      animateCameraTo(0, r * 0.6, r * 2.1, 0, r * 0.25, 0)
    } else if (cameraMode === 'orbit') {
      animateCameraTo(r * 1.5, r * 1.1, r * 1.6, 0, r * 0.25, 0)
    }
  }, [cameraMode, r])

  // Selected Node Focus
  useEffect(() => {
    if (!selectedNode) return

    let targetPos = [0, r * 0.25, 0]
    let camOffset = [r * 0.9, r * 0.45, r * 0.9]

    if (selectedNode.position) {
      targetPos = selectedNode.position
    } else if (selectedNode.yPos !== undefined) {
      targetPos = [0, selectedNode.yPos + selectedNode.height / 2, 0]
    }

    animateCameraTo(
      targetPos[0] + camOffset[0],
      targetPos[1] + camOffset[1],
      targetPos[2] + camOffset[2],
      targetPos[0],
      targetPos[1],
      targetPos[2],
      1.8,
    )
  }, [selectedNode, r])

  // Auto-Tour Rotation
  useFrame(() => {
    if (cameraMode === 'tour' && controlsRef.current) {
      controlsRef.current.azimuthAngle += 0.003
      controlsRef.current.update()
    }
  })

  if (cameraMode === 'firstPerson') {
    return null
  }

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2 - 0.02}
      minDistance={r * 0.25}
      maxDistance={r * 8.0}
      makeDefault
    />
  )
}
