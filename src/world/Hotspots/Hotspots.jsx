import { Html } from '@react-three/drei'
import { useTwinStore } from '../../store/useTwinStore'

export function Hotspots() {
  const showHotspots = useTwinStore((state) => state.showHotspots)
  const selectedNode = useTwinStore((state) => state.selectedNode)
  const setSelectedNode = useTwinStore((state) => state.setSelectedNode)
  const setActiveFloor = useTwinStore((state) => state.setActiveFloor)
  const setCameraMode = useTwinStore((state) => state.setCameraMode)

  if (!showHotspots) return null

  const hotspotList = [
    {
      id: 'lobby',
      label: 'Main Lobby',
      level: 'L1',
      position: [-4, 2.2, 3],
      description: 'Visitor reception, security turnstiles & access logging.',
      temp: '21.5 °C',
      occupants: 18,
    },
    {
      id: 'ops',
      label: 'NOC & Ops Center',
      level: 'L2',
      position: [3, 5.5, -2],
      description: 'Network operations center, server racks & IoT gateways.',
      temp: '19.8 °C',
      occupants: 34,
    },
    {
      id: 'ai-hub',
      label: 'AI & Executive Hub',
      level: 'L3',
      position: [-2, 9.0, 1],
      description: 'Compute cluster control room & executive briefing suite.',
      temp: '22.1 °C',
      occupants: 22,
    },
    {
      id: 'solar',
      label: 'Solar Array',
      level: 'Roof',
      position: [0, 12.0, 0],
      description: '450W Monocrystalline PV solar panel matrix & inverter.',
      output: '9.4 kW',
    },
  ]

  const handleSelect = (spot) => {
    setSelectedNode(spot)
    setActiveFloor(spot.level)
    setCameraMode('orbit')
  }

  return (
    <group>
      {hotspotList.map((spot) => {
        const isSelected = selectedNode?.id === spot.id

        return (
          <Html key={spot.id} position={spot.position} center distanceFactor={22}>
            <div
              onClick={() => handleSelect(spot)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: isSelected ? 'rgba(59, 130, 246, 0.95)' : 'rgba(15, 23, 42, 0.85)',
                color: '#fff',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 600,
                border: isSelected ? '1px solid #60a5fa' : '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: isSelected
                  ? '0 0 16px rgba(59, 130, 246, 0.6)'
                  : '0 4px 12px rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(8px)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '12px' }}>📍</span>
              <span>{spot.label}</span>
            </div>
          </Html>
        )
      })}
    </group>
  )
}
