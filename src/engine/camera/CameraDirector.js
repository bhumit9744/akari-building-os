import gsap from 'gsap'
import { useTwinStore } from '../../store/useTwinStore'
import { timeController } from '../environment/TimeController'

class CameraDirector {
  constructor() {
    this.timeline = null
    this.isPlaying = false
  }

  /**
   * Keyframe stops across the campus
   */
  getWaypoints() {
    return [
      { name: "Bird's Eye Overview", cam: [0, 45, 0.1], target: [0, 0, 0], duration: 3, timeOfDay: 10 },
      { name: 'Main Entrance & Plaza', cam: [0, 6, 28], target: [0, 2, 0], duration: 4, timeOfDay: 12 },
      { name: 'L1 — Reception & Security', cam: [-12, 5, 12], target: [-4, 2, 3], duration: 3.5, timeOfDay: 14 },
      { name: 'L2 — NOC Engineering', cam: [14, 8, -10], target: [3, 5.5, -2], duration: 3.5, timeOfDay: 16 },
      { name: 'Rooftop — Solar Array', cam: [0, 18, 14], target: [0, 12, 0], duration: 4, timeOfDay: 17.5 },
      { name: 'Night City Illumination', cam: [30, 25, 30], target: [0, 5, 0], duration: 4.5, timeOfDay: 21 },
      { name: 'Campus Sunrise Overview', cam: [22, 18, 25], target: [0, 5, 0], duration: 3.5, timeOfDay: 6.5 },
    ]
  }

  startCinematicTour() {
    const store = useTwinStore.getState()
    const waypoints = this.getWaypoints()
    store.setCameraMode('tour')

    if (this.timeline) this.timeline.kill()
    this.isPlaying = true

    this.timeline = gsap.timeline({
      onComplete: () => {
        this.isPlaying = false
        store.setCameraMode('orbit')
        store.setActiveFloor('all')
      },
    })

    waypoints.forEach((wp) => {
      this.timeline.to({}, {
        duration: wp.duration,
        onStart: () => {
          timeController.setTimeOfDay(wp.timeOfDay)
          store.setSelectedNode({
            name: wp.name,
            description: `Cinematic Tour stop: ${wp.name}`,
          })
        },
      })
    })
  }

  stopTour() {
    if (this.timeline) {
      this.timeline.kill()
      this.timeline = null
    }
    this.isPlaying = false
    useTwinStore.getState().setCameraMode('orbit')
  }
}

export const cameraDirector = new CameraDirector()
