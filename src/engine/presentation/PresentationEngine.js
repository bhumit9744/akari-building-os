import gsap from 'gsap'
import { useTwinStore } from '../../store/useTwinStore'
import { timeController } from '../environment/TimeController'

class CameraDirector {
  constructor() {
    this.timeline = null
    this.isPlaying = false
  }

  getWaypoints() {
    const info = useTwinStore.getState().activeAssetInfo
    const r = info ? info.radius : 18
    const h = info ? info.size.y : 12

    return [
      {
        name: '🎬 Sunrise Model-Independent Overview',
        cam: [0, r * 2.2, r * 2.2],
        target: [0, h * 0.2, 0],
        duration: 4.5,
        timeOfDay: 6.5,
      },
      {
        name: '🌊 Midday Plaza & Entrance Arrival',
        cam: [r * 0.8, r * 0.4, r * 1.2],
        target: [0, h * 0.2, 0],
        duration: 4.5,
        timeOfDay: 12.0,
      },
      {
        name: '🛋️ Lower Level Atrium Inspection',
        cam: [r * 0.6, h * 0.4, r * 0.6],
        target: [0, h * 0.3, 0],
        duration: 4,
        timeOfDay: 14.0,
      },
      {
        name: '🛏️ Mid-Level Elevation View',
        cam: [-r * 0.7, h * 0.7, r * 0.5],
        target: [0, h * 0.6, 0],
        duration: 4.5,
        timeOfDay: 16.5,
      },
      {
        name: '🪴 Outdoor Landscaping & Garden Area',
        cam: [r * 1.1, h * 0.3, -r * 0.7],
        target: [r * 0.4, h * 0.1, -r * 0.3],
        duration: 4,
        timeOfDay: 17.8,
      },
      {
        name: '☀️ Rooftop Sky Terrace & Solar Array',
        cam: [0, h * 1.6, r * 0.6],
        target: [0, h * 0.95, 0],
        duration: 4.5,
        timeOfDay: 18.5,
      },
      {
        name: '🌃 Dusk City Illumination',
        cam: [r * 1.5, r * 1.1, r * 1.5],
        target: [0, h * 0.3, 0],
        duration: 5,
        timeOfDay: 21.5,
      },
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
            description: `Dynamic Camera Track: ${wp.name}`,
            position: wp.target,
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
