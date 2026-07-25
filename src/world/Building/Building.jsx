import { useState } from 'react'
import { Html } from '@react-three/drei'
import { useTwinStore } from '../../store/useTwinStore'

function BuildingFloor({ level, yPos, height, label, isSelected, isHovered, onHover, onClick, wireframe }) {
  const activeFloor = useTwinStore((state) => state.activeFloor)
  const isFiltered = activeFloor !== 'all' && activeFloor !== level

  if (isFiltered) return null

  return (
    <group position={[0, yPos, 0]}>
      {/* Concrete Floor Slab */}
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
        <boxGeometry args={[16, 0.4, 12]} />
        <meshStandardMaterial
          color={isSelected ? '#3b82f6' : isHovered ? '#60a5fa' : '#1e293b'}
          roughness={0.3}
          metalness={0.8}
          wireframe={wireframe}
        />
      </mesh>

      {/* Glass Facade Curtain Wall */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[15.6, height - 0.4, 11.6]} />
        <meshPhysicalMaterial
          color={isHovered ? '#93c5fd' : '#38bdf8'}
          transparent
          opacity={0.32}
          roughness={0.1}
          transmission={0.85}
          ior={1.4}
          wireframe={wireframe}
        />
      </mesh>

      {/* Structural Steel Columns */}
      {[-6.5, 6.5].map((x) =>
        [-4.5, 4.5].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, height / 2, z]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, height - 0.4, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.95} roughness={0.1} />
          </mesh>
        )),
      )}

      {/* Level Label Overlay Pin */}
      <Html position={[9, height / 2, 0]} center distanceFactor={28}>
        <div
          onClick={() => onClick(level)}
          style={{
            background: isSelected ? 'rgba(59, 130, 246, 0.95)' : 'rgba(15, 23, 42, 0.85)',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            border: isSelected ? '1px solid #60a5fa' : '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  )
}

export function Building() {
  const [hoveredFloor, setHoveredFloor] = useState(null)
  const wireframeMode = useTwinStore((state) => state.wireframeMode)
  const activeFloor = useTwinStore((state) => state.activeFloor)
  const setActiveFloor = useTwinStore((state) => state.setActiveFloor)
  const setSelectedNode = useTwinStore((state) => state.setSelectedNode)

  const floors = [
    { level: 'L1', yPos: 0.2, height: 3.8, label: 'L1 — Lobby & Security' },
    { level: 'L2', yPos: 4.0, height: 3.8, label: 'L2 — Engineering & NOC' },
    { level: 'L3', yPos: 7.8, height: 3.8, label: 'L3 — AI & Executive Hub' },
    { level: 'Roof', yPos: 11.6, height: 1.8, label: 'Roof — Solar & Helipad' },
  ]

  const handleSelectFloor = (level) => {
    setActiveFloor(level)
    const target = floors.find((f) => f.level === level)
    setSelectedNode(target ? { type: 'Floor', ...target } : null)
  }

  return (
    <group position={[0, 0, 0]}>
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

      {/* Helipad Marking on Roof */}
      {(activeFloor === 'all' || activeFloor === 'Roof') && (
        <group position={[0, 11.75, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 2.8, 32]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
        </group>
      )}
    </group>
  )
}
