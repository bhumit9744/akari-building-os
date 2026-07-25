import { useState } from 'react'
import { Grid, Html } from '@react-three/drei'
import { useTwinStore } from '../../store/useTwinStore'

function BuildingFloor({ level, yPos, height, label, isSelected, isHovered, onHover, onClick, wireframe }) {
  const activeFloor = useTwinStore((state) => state.activeFloor)
  const isFiltered = activeFloor !== 'all' && activeFloor !== level

  if (isFiltered) return null

  return (
    <group position={[0, yPos, 0]}>
      {/* Floor Slab */}
      <mesh
        castShadow
        receiveShadow
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(level)
        }}
        onPointerOut={() => onHover(null)}
        onClick={(e) => {
          e.stopPropagation()
          onClick(level)
        }}
      >
        <boxGeometry args={[14, 0.4, 10]} />
        <meshStandardMaterial
          color={isSelected ? '#3b82f6' : isHovered ? '#60a5fa' : '#1e293b'}
          roughness={0.3}
          metalness={0.8}
          wireframe={wireframe}
        />
      </mesh>

      {/* Glass Facade Walls */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[13.6, height - 0.4, 9.6]} />
        <meshPhysicalMaterial
          color={isHovered ? '#93c5fd' : '#38bdf8'}
          transparent
          opacity={0.3}
          roughness={0.1}
          transmission={0.85}
          ior={1.4}
          wireframe={wireframe}
        />
      </mesh>

      {/* Internal Core Pillars */}
      <mesh position={[-4, height / 2, -2]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, height - 0.4, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[4, height / 2, -2]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, height - 0.4, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Level Label Pin */}
      <Html position={[7.5, height / 2, 0]} center distanceFactor={25}>
        <div
          onClick={() => onClick(level)}
          style={{
            background: isSelected ? 'rgba(59, 130, 246, 0.9)' : 'rgba(15, 23, 42, 0.85)',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 600,
            border: isSelected ? '1px solid #60a5fa' : '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  )
}

export function BuildingScene() {
  const [hoveredFloor, setHoveredFloor] = useState(null)
  const showGrid = useTwinStore((state) => state.showGrid)
  const wireframeMode = useTwinStore((state) => state.wireframeMode)
  const activeFloor = useTwinStore((state) => state.activeFloor)
  const setActiveFloor = useTwinStore((state) => state.setActiveFloor)
  const setSelectedNode = useTwinStore((state) => state.setSelectedNode)

  const floors = [
    { level: 'L1', yPos: 0.2, height: 3.5, label: 'Level 1 — Main Lobby & Reception' },
    { level: 'L2', yPos: 3.7, height: 3.5, label: 'Level 2 — Engineering & Operations' },
    { level: 'L3', yPos: 7.2, height: 3.5, label: 'Level 3 — Executive Suite & AI Hub' },
    { level: 'Roof', yPos: 10.7, height: 2.0, label: 'Rooftop — Solar Array & Helipad' },
  ]

  const handleSelectFloor = (level) => {
    setActiveFloor(level)
    const target = floors.find((f) => f.level === level)
    setSelectedNode(target ? { type: 'Floor', ...target } : null)
  }

  return (
    <group position={[0, 0, 0]}>
      {/* Procedural Grid Plane */}
      {showGrid && (
        <Grid
          position={[0, 0, 0]}
          args={[60, 60]}
          cellSize={1}
          cellThickness={0.8}
          cellColor="#334155"
          sectionSize={5}
          sectionThickness={1.5}
          sectionColor="#3b82f6"
          fadeDistance={50}
          fadeStrength={1.5}
        />
      )}

      {/* Main Ground Base */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <boxGeometry args={[40, 0.3, 30]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Building Core Tower */}
      {floors.map((f) => (
        <BuildingFloor
          key={f.level}
          {...f}
          isSelected={activeFloor === f.level}
          isHovered={hoveredFloor === f.level}
          onHover={setHoveredFloor}
          onClick={handleSelectFloor}
          wireframe={wireframeMode}
        />
      ))}
    </group>
  )
}
