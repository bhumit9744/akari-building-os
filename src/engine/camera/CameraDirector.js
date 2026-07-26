import gsap from 'gsap'
import { useTwinStore } from '../../store/useTwinStore'
import { timeController } from '../environment/TimeController'

class CameraDirector {
  constructor() {
    this.timeline = null
    this.isPlaying = false
  }

  getWaypoints() {
    return [
      {
        name: '🎬 Hero Coastal Villa Flyover',
        cam: [140, 90, 140],
        target: [0, 5, 0],
        duration: 4.5,
        timeOfDay: 7.0,
      },
      {
        name: '🌊 Ocean Frontage & Horizon View',
        cam: [0, 40, 160],
        target: [0, 5, 0],
        duration: 4.5,
        timeOfDay: 12.0,
      },
      {
        name: '🏊 Pool Deck & Lounger Patio',
        cam: [25, 12, 25],
        target: [5, 2, 12],
        duration: 4,
        timeOfDay: 14.0,
      },
      {
        name: '🏡 Hillside Villa Left Perspective',
        cam: [-180, 60, 60],
        target: [0, 5, 0],
        duration: 4.5,
        timeOfDay: 16.5,
      },
      {
        name: '🪴 Bonsai Zen Rock Garden',
        cam: [35, 15, -20],
        target: [14, 1, -8],
        duration: 4,
        timeOfDay: 17.8,
      },
      {
        name: '☀️ Rooftop Sky Terrace & Solar Array',
        cam: [-20, 170, -20],
        target: [0, 14, -2],
        duration: 4.5,
        timeOfDay: 18.5,
      },
      {
        name: '🌃 Dusk Villa Illumination & City Lights',
        cam: [120, 70, 120],
        target: [0, 5, 0],
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
            description: `Villa Cinematic Reveal: ${wp.name}`,
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
