import { useTwinStore } from '../../store/useTwinStore'

export const CAMPUS_REGISTRY = {
  'akari-hq': {
    id: 'akari-hq',
    name: 'Akari HQ Campus',
    location: 'San Francisco, CA',
    coords: { latitude: 37.7749, longitude: -122.4194 },
    buildingsCount: 1,
    floorsCount: 4,
    cameraPreset: [25, 20, 30],
    description: 'Main flagship digital twin campus featuring glass tower, NOC center, and solar array.',
  },
  'innovation-park': {
    id: 'innovation-park',
    name: 'Innovation Tech Park',
    location: 'Austin, TX',
    coords: { latitude: 30.2672, longitude: -97.7431 },
    buildingsCount: 3,
    floorsCount: 12,
    cameraPreset: [35, 28, 40],
    description: 'Advanced R&D tech park housing quantum compute labs and hardware testing bays.',
  },
  'logistics-hub': {
    id: 'logistics-hub',
    name: 'Logistics & Cargo Hub',
    location: 'Chicago, IL',
    coords: { latitude: 41.8781, longitude: -87.6298 },
    buildingsCount: 2,
    floorsCount: 2,
    cameraPreset: [30, 22, 35],
    description: 'Automated fulfillment facility with real-time AMR fleet tracking & EV charging.',
  },
}

class ProjectManager {
  constructor() {
    this.activeCampusId = 'akari-hq'
  }

  loadCampus(campusId) {
    const campus = CAMPUS_REGISTRY[campusId]
    if (!campus) return

    this.activeCampusId = campusId
    useTwinStore.getState().setActiveCampus?.(campus)
    useTwinStore.getState().setCameraMode?.('orbit')
    useTwinStore.getState().setSelectedNode?.(null)
  }

  getActiveCampus() {
    return CAMPUS_REGISTRY[this.activeCampusId]
  }
}

export const projectManager = new ProjectManager()
