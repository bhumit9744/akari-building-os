import { create } from 'zustand'

export const useTwinStore = create((set) => ({
  // Camera & Navigation State
  cameraMode: 'orbit', // 'orbit' | 'top' | 'front' | 'fly'
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

  wireframeMode: false,
  toggleWireframe: () => set((state) => ({ wireframeMode: !state.wireframeMode })),

  environmentPreset: 'city', // 'city' | 'night' | 'sunset' | 'dawn'
  setEnvironmentPreset: (preset) => set({ environmentPreset: preset }),

  // Active Building / Selection
  activeFloor: 'all', // 'all' | 'L1' | 'L2' | 'L3' | 'Roof'
  setActiveFloor: (floor) => set({ activeFloor: floor }),

  selectedNode: null,
  setSelectedNode: (node) => set({ selectedNode: node }),

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
