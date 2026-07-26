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
        name: '🎬 Product Reveal: Sunrise Campus Overview',
        cam: [0, 48, 0.1],
        target: [0, 0, 0],
        duration: 4,
        timeOfDay: 6.5,
      },
      {
        name: '🏙️ Midday Architecture & Plaza Arrival',
        cam: [0, 8, 30],
        target: [0, 3, 0],
        duration: 4.5,
        timeOfDay: 12.0,
      },
      {
        name: '🏢 Level 1 — Lobby & Security Turnstiles',
        cam: [-12, 5, 12],
        target: [-4, 2, 3],
        duration: 4,
        timeOfDay: 13.5,
      },
      {
        name: '🖥️ Level 2 — NOC Server Room AI Compute',
        cam: [14, 8, -10],
        target: [3, 5.5, -2],
        duration: 4,
        timeOfDay: 15.5,
      },
      {
        name: '☀️ Sunset Rooftop — Solar Generation Peak',
        cam: [0, 18, 14],
        target: [0, 12, 0],
        duration: 4.5,
        timeOfDay: 17.8,
      },
      {
        name: '🌃 Dusk Transition — Night City Illumination',
        cam: [30, 25, 30],
        target: [0, 5, 0],
        duration: 5,
        timeOfDay: 21.5,
      },
      {
        name: '🌌 Akari Engine v3.6 — Full Platform Overview',
        cam: [25, 20, 30],
        target: [0, 5, 0],
        duration: 4,
        timeOfDay: 12.0,
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
            description: `Film Director Sequence: ${wp.name}`,
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
