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
        name: '🎬 Hero Villa Sunrise Flyover',
        cam: [0, 35, 35],
        target: [0, 2, 0],
        duration: 4.5,
        timeOfDay: 6.5,
      },
      {
        name: '🌊 Ocean Pool Deck & Lounger Lounge',
        cam: [12, 6, 16],
        target: [5, 2, 8],
        duration: 4.5,
        timeOfDay: 12.0,
      },
      {
        name: '🛋️ Ocean View Living Suite Atrium',
        cam: [0, 8, 14],
        target: [0, 4, 0],
        duration: 4,
        timeOfDay: 14.0,
      },
      {
        name: '🛏️ Upper Master Bedroom Balcony',
        cam: [-10, 11, 8],
        target: [-4, 7, -2],
        duration: 4.5,
        timeOfDay: 16.5,
      },
      {
        name: '🪴 Hillside Bonsai Zen Garden',
        cam: [18, 5, -12],
        target: [12, 1, -5],
        duration: 4,
        timeOfDay: 17.8,
      },
      {
        name: '☀️ Rooftop Sky Terrace & Solar Array',
        cam: [0, 22, 10],
        target: [0, 10, -2],
        duration: 4.5,
        timeOfDay: 18.5,
      },
      {
        name: '🌃 Dusk Villa Illumination & City Lights',
        cam: [25, 20, 30],
        target: [0, 4, 0],
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
            description: `Villa Cinematic Track: ${wp.name}`,
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
