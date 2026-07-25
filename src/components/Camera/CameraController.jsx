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

  // Smooth camera position transition via GSAP
  const animateCameraTo = (posX, posY, posZ, targetX = 0, targetY = 5, targetZ = 0, duration = 1.6) => {
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

  // Handle Preset Changes
  useEffect(() => {
    if (selectedNode) return // Let node selection handle camera focus if node is active

    if (cameraMode === 'top') {
      animateCameraTo(0, 50, 0.1, 0, 0, 0)
    } else if (cameraMode === 'front') {
      animateCameraTo(0, 10, 38, 0, 5, 0)
    } else if (cameraMode === 'orbit') {
      animateCameraTo(25, 20, 30, 0, 5, 0)
    }
  }, [cameraMode])

  // Handle Selected Node / Hotspot Focus
  useEffect(() => {
    if (!selectedNode) return

    let targetPos = [0, 5, 0]
    let camOffset = [16, 8, 16]

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

  // Auto-Tour Slow Rotation
  useFrame(() => {
    if (cameraMode === 'tour' && controlsRef.current) {
      controlsRef.current.azimuthAngle += 0.003
      controlsRef.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2 - 0.02}
      minDistance={4}
      maxDistance={140}
      makeDefault
    />
  )
}
