import { useState } from 'react'
import { Html } from '@react-three/drei'
import { useTwinStore } from '../../store/useTwinStore'
import { materials } from '../../core/materials/materials'

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
        material={
          isSelected
            ? materials.slabSelected
            : materials.slabConcrete
        }
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
      </mesh>

      {/* Glass Facade Curtain Wall */}
      <mesh
        position={[0, height / 2, 0]}
        material={isHovered ? materials.glassHover : materials.glass}
      >
        <boxGeometry args={[15.6, height - 0.4, 11.6]} />
      </mesh>

      {/* Structural Steel Columns */}
      {[-6.5, 6.5].map((x) =>
        [-4.5, 4.5].map((z) => (
          <mesh
            key={`${x}-${z}`}
            position={[x, height / 2, z]}
            castShadow
            material={materials.steelColumn}
          >
            <cylinderGeometry args={[0.25, 0.25, height - 0.4, 16]} />
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

      {/* Solar Panel Array on Roof */}
      {(activeFloor === 'all' || activeFloor === 'Roof') && (
        <group position={[0, 11.8, 0]}>
          <mesh position={[-4, 0.1, 0]} material={materials.solarPanel} castShadow>
            <boxGeometry args={[5, 0.1, 8]} />
          </mesh>
          <mesh position={[4, 0.1, 0]} material={materials.solarPanel} castShadow>
            <boxGeometry args={[5, 0.1, 8]} />
          </mesh>

          {/* Helipad Marking */}
          <group position={[0, 0.05, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.8, 2.1, 32]} />
              <meshBasicMaterial color="#f59e0b" />
            </mesh>
          </group>
        </group>
      )}
    </group>
  )
}
