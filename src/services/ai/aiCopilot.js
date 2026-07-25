import { useTwinStore } from '../../store/useTwinStore'

class AICopilotService {
  processPrompt(prompt) {
    const query = prompt.toLowerCase()
    const store = useTwinStore.getState()

    if (query.includes('solar') || query.includes('roof') || query.includes('power')) {
      store.setActiveFloor('Roof')
      store.setCameraMode('orbit')
      store.setSelectedNode({
        id: 'solar',
        graphId: 'hotspot.solar',
        name: 'Rooftop Solar Array Inverter',
        type: 'Renewable Energy',
        status: '9.4 kW Active Generation',
        position: [0, 12, 0],
        description: '450W Monocrystalline PV solar array feeding peak-shaving battery matrix.',
      })
      return {
        reply: '☀️ Focusing Rooftop Solar Array. Current output is 9.4 kW with 100% inverter efficiency.',
        action: 'FOCUS_SOLAR',
      }
    }

    if (query.includes('temp') || query.includes('hvac') || query.includes('22') || query.includes('warm') || query.includes('heat')) {
      store.setActiveFloor('L2')
      store.setSelectedNode({
        id: 'ops',
        graphId: 'building.l2',
        name: 'Level 2 — NOC Center',
        type: 'Operations',
        status: 'Optimal (19.8 °C)',
        position: [3, 5.5, -2],
        description: 'NOC & Engineering floor. HVAC Chiller-02 running at optimal precision cooling.',
      })
      return {
        reply: '🌡️ Scanned all floor zones. Level 2 NOC is maintaining 19.8°C while Level 3 is at 22.1°C.',
        action: 'FOCUS_HVAC',
      }
    }

    if (query.includes('noc') || query.includes('ops') || query.includes('server')) {
      store.setActiveFloor('L2')
      store.setSelectedNode({
        id: 'ops',
        graphId: 'hotspot.ops',
        name: 'NOC Server Rack Enclosure',
        type: 'Infrastructure',
        status: 'Optimal',
        position: [3, 5.5, -2],
        description: 'Tier-3 data center rack enclosure with FM200 automated fire suppression.',
      })
      return {
        reply: '🖥️ Displaying NOC Server Rack Enclosure. All fiber links and server nodes are online.',
        action: 'FOCUS_NOC',
      }
    }

    if (query.includes('tour') || query.includes('rotate') || query.includes('spin') || query.includes('presentation')) {
      store.setCameraMode('tour')
      return {
        reply: '🎬 Initiating 360° Cinematic Auto-Tour around campus.',
        action: 'START_TOUR',
      }
    }

    if (query.includes('reset') || query.includes('all') || query.includes('overview')) {
      store.setActiveFloor('all')
      store.setSelectedNode(null)
      store.setCameraMode('orbit')
      return {
        reply: '🌌 Resetting 3D camera to full campus overview mode.',
        action: 'RESET_VIEW',
      }
    }

    return {
      reply: `🤖 Analyzed query "${prompt}". All facility systems are currently operating within normal parameters. You can ask me to "Highlight solar array", "Show rooms above 22°C", or "Start auto tour".`,
      action: 'GENERAL_INFO',
    }
  }
}

export const aiCopilot = new AICopilotService()
