import { EffectComposer, Bloom, Vignette, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import { useTwinStore } from '../../store/useTwinStore'

export function PostProcessing() {
  const environmentPreset = useTwinStore((state) => state.environmentPreset)

  return (
    <EffectComposer>
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <Bloom
        intensity={environmentPreset === 'night' ? 1.4 : 0.6}
        luminanceThreshold={0.7}
        luminanceSmoothing={0.3}
        height={300}
      />
      <Vignette eskil={false} offset={0.2} darkness={0.65} />
    </EffectComposer>
  )
}
