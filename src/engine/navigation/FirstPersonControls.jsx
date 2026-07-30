import { useRef, useEffect, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'

export function FirstPersonControls() {
  const { camera } = useThree()
  const controlsRef = useRef()
  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveRight, setMoveRight] = useState(false)

  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())

  useEffect(() => {
    // Set initial first-person camera position
    camera.position.set(0, 2, 5)
    camera.lookAt(0, 2, 0)
    
    const onKeyDown = (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          setMoveForward(true)
          break
        case 'ArrowLeft':
        case 'KeyA':
          setMoveLeft(true)
          break
        case 'ArrowDown':
        case 'KeyS':
          setMoveBackward(true)
          break
        case 'ArrowRight':
        case 'KeyD':
          setMoveRight(true)
          break
      }
    }

    const onKeyUp = (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          setMoveForward(false)
          break
        case 'ArrowLeft':
        case 'KeyA':
          setMoveLeft(false)
          break
        case 'ArrowDown':
        case 'KeyS':
          setMoveBackward(false)
          break
        case 'ArrowRight':
        case 'KeyD':
          setMoveRight(false)
          break
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [camera])

  useFrame((_, delta) => {
    if (controlsRef.current && controlsRef.current.isLocked) {
      // Reduce velocity (friction)
      velocity.current.x -= velocity.current.x * 10.0 * delta
      velocity.current.z -= velocity.current.z * 10.0 * delta

      direction.current.z = Number(moveForward) - Number(moveBackward)
      direction.current.x = Number(moveRight) - Number(moveLeft)
      direction.current.normalize() // consistent speed in all directions

      const speed = 40.0 // walk speed
      
      if (moveForward || moveBackward) velocity.current.z -= direction.current.z * speed * delta
      if (moveLeft || moveRight) velocity.current.x -= direction.current.x * speed * delta

      controlsRef.current.moveRight(-velocity.current.x * delta)
      controlsRef.current.moveForward(-velocity.current.z * delta)
      
      // Clamp Y height to ground level (2m eye level)
      // In a full digital twin, we would use a navmesh or raycaster against floors
      if (camera.position.y < 2) {
        camera.position.y = 2
      }
    }
  })

  return <PointerLockControls ref={controlsRef} />
}
