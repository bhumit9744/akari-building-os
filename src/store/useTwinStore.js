import { create } from 'zustand'
import { SCENE_GRAPH } from '../engine/selection/sceneGraph'
import { annotationManager } from '../plugins/annotations/AnnotationManager'
import { CAMPUS_REGISTRY } from '../services/projects/ProjectManager'

export const useTwinStore = create((set) => ({
  // Multi-Campus State
  activeCampus: CAMPUS_REGISTRY['akari-hq'],
  setActiveCampus: (campus) => set({ activeCampus: campus }),

  // 24-Hour Environment Time State (Default 14:00 PM)
  timeOfDay: 14.0,
  isNight: false,
  sunIntensity: 1.4,
  setTimeOfDayState: (data) =>
    set((state) => ({
      timeOfDay: data.timeOfDay,
      isNight: data.solar.isNight,
      sunIntensity: data.solar.sunIntensity,
      environmentPreset: data.solar.preset,
    })),

  // Camera & Navigation State
  cameraMode: 'orbit', // 'orbit' | 'top' | 'front' | 'tour'
  setCameraMode: (mode) => set({ cameraMode: mode }),

  // Layer Toggles
  showGrid: true,
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),

  showShadows: true,
  toggleShadows: () => set((state) => ({ showShadows: !state.showShadows })),

  showHotspots: true,
  toggleHotspots: () => set((state) => ({ showHotspots: !state.showHotspots })),

  showTrees: true,
  toggleTrees: () => set((state) => ({ showTrees: !state.showTrees })),

  showAnnotations: true,
  toggleAnnotations: () => set((state) => ({ showAnnotations: !state.showAnnotations })),

  wireframeMode: false,
  toggleWireframe: () => set((state) => ({ wireframeMode: !state.wireframeMode })),

  // Developer Performance Stats
  showPerfStats: false,
  togglePerfStats: () => set((state) => ({ showPerfStats: !state.showPerfStats })),

  // Section View Clipping Plane
  clippingEnabled: false,
  toggleClipping: () => set((state) => ({ clippingEnabled: !state.clippingEnabled })),
  clippingHeight: 8.0,
  setClippingHeight: (height) => set({ clippingHeight: height }),

  environmentPreset: 'city',
  setEnvironmentPreset: (preset) => set({ environmentPreset: preset }),

  // Active Building / Selection
  activeFloor: 'all',
  setActiveFloor: (floor) => set({ activeFloor: floor }),

  selectedNode: null,
  setSelectedNode: (node) => {
    if (!node) {
      set({ selectedNode: null })
      return
    }
    const graphKey = node.graphId || (node.id ? `hotspot.${node.id}` : `building.${node.level?.toLowerCase()}`)
    const meta = SCENE_GRAPH[graphKey] || node
    set({ selectedNode: { ...node, ...meta } })
  },

  // Annotations List
  annotations: annotationManager.getAnnotations(),
  setAnnotations: (list) => set({ annotations: list }),

  // AI Copilot Modal
  aiCopilotOpen: false,
  toggleAICopilot: () => set((state) => ({ aiCopilotOpen: !state.aiCopilotOpen })),

  // Panel Visibilities
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  infoPanelOpen: true,
  toggleInfoPanel: () => set((state) => ({ infoPanelOpen: !state.infoPanelOpen })),

  // IoT Telemetry Stream
  telemetry: {
    hvacTemp: 21.8,
    occupancy: 84,
    maxOccupancy: 120,
    powerKw: 14.2,
    solarGenerationKw: 9.4,
    aqi: 98,
    chillerStatus: 'Optimal',
    accessControl: 'Secured',
  },
  setTelemetryData: (data) => set({ telemetry: { ...data } }),
}))
