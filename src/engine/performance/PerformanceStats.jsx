import { Stats } from '@react-three/drei'
import { useTwinStore } from '../../store/useTwinStore'

export function PerformanceStats() {
  const showPerfStats = useTwinStore((state) => state.showPerfStats)

  if (!showPerfStats) return null

  return <Stats className="perf-stats-hud" />
}
