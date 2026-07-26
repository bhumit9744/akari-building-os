import { useMemo } from 'react'
import { Environment } from '@react-three/drei'
import { useTwinStore } from '../../store/useTwinStore'

export function HDRManager() {
  const timeOfDay = useTwinStore((state) => state.timeOfDay)

  const preset = useMemo(() => {
    if (timeOfDay >= 5 && timeOfDay < 7) return 'dawn'
    if (timeOfDay >= 7 && timeOfDay < 17) return 'city'
    if (timeOfDay >= 17 && timeOfDay < 19) return 'sunset'
    return 'night'
  }, [timeOfDay])

  const intensity = useMemo(() => {
    if (timeOfDay < 5.5 || timeOfDay > 18.5) return 0.25
    if (timeOfDay < 7 || timeOfDay > 17) return 0.7
    return 1.1
  }, [timeOfDay])

  return <Environment preset={preset} environmentIntensity={intensity} background={false} />
}
