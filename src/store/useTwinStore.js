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

  // Telemetry & Stats
  fps: 60,
  setFps: (fps) => set({ fps }),
}))
