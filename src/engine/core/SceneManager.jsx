import { Suspense } from 'react'
import { SectionClipping } from '../renderer/SectionClipping'
import { SkySystem } from '../environment/SkySystem'
import { HDRManager } from '../environment/HDRManager'
import { GLBModel } from '../loaders/GLBModel'
import { Ground } from './Ground'
import { Roads } from './Roads'
import { Trees } from './Trees'
import { Vehicles } from './Vehicles'
import { InteriorLighting } from '../environment/InteriorLighting'
import { AmbientAnimations } from '../animation/AnimationEngine'
import { HotspotEngine } from '../hotspots/HotspotEngine'
import { Annotations } from './Annotations'

export function SceneManager() {
  return (
    <>
      <SectionClipping />
      <SkySystem />
      <HDRManager />
      <Ground />
      <Roads />
      <Trees />
      <Vehicles />
      <InteriorLighting />
      <AmbientAnimations />
      <GLBModel url="/models/modern_coastal_hillside_villa.glb" />
      <HotspotEngine />
      <Annotations />
    </>
  )
}
