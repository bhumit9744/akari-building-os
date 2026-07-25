import * as THREE from 'three'

/**
 * Centralized PBR Material Factory for Akari Digital Twin
 */

export const materials = {
  // Architectural Glass Curtain Wall
  glass: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#38bdf8'),
    transparent: true,
    opacity: 0.32,
    roughness: 0.08,
    metalness: 0.1,
    transmission: 0.9,
    ior: 1.5,
    thickness: 0.5,
    specularIntensity: 1.0,
    specularColor: new THREE.Color('#ffffff'),
  }),

  // Glass Hover State
  glassHover: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#60a5fa'),
    transparent: true,
    opacity: 0.5,
    roughness: 0.05,
    metalness: 0.2,
    transmission: 0.85,
    ior: 1.5,
    emissive: new THREE.Color('#1e40af'),
    emissiveIntensity: 0.25,
  }),

  // Structural Floor Slab Concrete
  slabConcrete: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1e293b'),
    roughness: 0.35,
    metalness: 0.75,
  }),

  // Selected Floor Slab Concrete
  slabSelected: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#3b82f6'),
    roughness: 0.25,
    metalness: 0.85,
    emissive: new THREE.Color('#1d4ed8'),
    emissiveIntensity: 0.4,
  }),

  // Structural Steel Pillars
  steelColumn: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#475569'),
    roughness: 0.15,
    metalness: 0.95,
  }),

  // PV Solar Panels (Rooftop)
  solarPanel: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0284c7'),
    roughness: 0.2,
    metalness: 0.9,
    emissive: new THREE.Color('#0369a1'),
    emissiveIntensity: 0.3,
  }),

  // Roadway Asphalt
  asphalt: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0f172a'),
    roughness: 0.92,
    metalness: 0.08,
  }),

  // Curb & Sidewalk Concrete
  sidewalk: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#334155'),
    roughness: 0.55,
    metalness: 0.2,
  }),

  // Campus Ground Grass Turf
  grassTurf: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0b1329'),
    roughness: 0.95,
    metalness: 0.05,
  }),

  // Foliage Tree Leaves
  treeFoliage: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#047857'),
    roughness: 0.65,
    metalness: 0.1,
  }),

  treeFoliageHighlight: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#10b981'),
    roughness: 0.5,
    metalness: 0.1,
  }),

  // Tree Trunk Bark
  treeTrunk: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#78350f'),
    roughness: 0.9,
    metalness: 0.05,
  }),
}
