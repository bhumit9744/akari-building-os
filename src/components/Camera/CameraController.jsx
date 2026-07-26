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

  const animateCameraTo = (
    posX,
    posY,
    posZ,
    targetX = 0,
    targetY = 5,
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

  // Preset Views for Coastal Villa
  useEffect(() => {
    if (selectedNode) return

    if (cameraMode === 'top') {
      animateCameraTo(-20, 170, -20, 0, 0, 0)
    } else if (cameraMode === 'front') {
      animateCameraTo(0, 40, 160, 0, 5, 0)
    } else if (cameraMode === 'orbit') {
      animateCameraTo(140, 90, 140, 0, 5, 0)
    }
  }, [cameraMode])

  // Selected Node Focus
  useEffect(() => {
    if (!selectedNode) return

    let targetPos = [0, 5, 0]
    let camOffset = [45, 25, 45]

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
  }, [selectedNode])

  // Auto-Tour Rotation
  useFrame(() => {
    if (cameraMode === 'tour' && controlsRef.current) {
      controlsRef.current.azimuthAngle += 0.002
      controlsRef.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2 - 0.01}
      minDistance={10}
      maxDistance={600}
      makeDefault
    />
  )
}
