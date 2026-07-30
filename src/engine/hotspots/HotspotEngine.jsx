import { Html } from '@react-three/drei'
import { useTwinStore } from '../../store/useTwinStore'

export function HotspotEngine() {
  const showHotspots = useTwinStore((state) => state.showHotspots)
  const selectedNode = useTwinStore((state) => state.selectedNode)
  const setSelectedNode = useTwinStore((state) => state.setSelectedNode)
  const setCameraMode = useTwinStore((state) => state.setCameraMode)
  const activeAssetInfo = useTwinStore((state) => state.activeAssetInfo)

  if (!showHotspots) return null

  // Model-relative dimensions (fallback to default building size)
  const width = activeAssetInfo ? activeAssetInfo.size.x : 16
  const height = activeAssetInfo ? activeAssetInfo.size.y : 12
  const depth = activeAssetInfo ? activeAssetInfo.size.z : 12

  const hotspotList = [
    {
      id: 'villa-pool',
      label: '🏊 Pool Deck & Lounge',
      level: 'L1',
      position: [width * 0.22, height * 0.15, depth * 0.35],
      description: 'Infinity oceanfront pool deck, loungers & outdoor dining patio.',
      temp: '24.2 °C',
      occupants: 6,
    },
    {
      id: 'villa-living',
      label: '🛋️ Ocean View Living Suite',
      level: 'L1',
      position: [0, height * 0.38, depth * 0.05],
      description: 'Glass-walled main atrium, fireplace lounge & smart lighting hub.',
      temp: '21.8 °C',
      occupants: 12,
    },
    {
      id: 'villa-master',
      label: '🛏️ Upper Master Balcony',
      level: 'L2',
      position: [-width * 0.15, height * 0.65, -depth * 0.1],
      description: 'Private master bedroom suite with panoramic coastal views.',
      temp: '22.0 °C',
      occupants: 2,
    },
    {
      id: 'villa-garden',
      label: '🪴 Hillside Bonsai Garden',
      level: 'Ground',
      position: [width * 0.42, height * 0.08, -depth * 0.25],
      description: 'Zen rock garden, Japanese bonsai trees & automated drip irrigation.',
      moisture: '88% Optimal',
    },
    {
      id: 'villa-roof',
      label: '☀️ Rooftop Sky Terrace',
      level: 'Roof',
      position: [0, height * 0.95, 0],
      description: 'Solar micro-inverter matrix & rooftop star observation lounge.',
      output: '9.4 kW',
    },
  ]

  const handleSelect = (spot) => {
    setSelectedNode(spot)
    setCameraMode('orbit')
  }

  return (
    <group>
      {hotspotList.map((spot) => {
        const isSelected = selectedNode?.id === spot.id

        return (
          <Html key={spot.id} position={spot.position} center distanceFactor={40}>
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
              <span>{spot.label}</span>
            </div>
          </Html>
        )
      })}
    </group>
  )
}
