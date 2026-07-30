import { Viewer } from './experience/Viewer/Viewer'
import { Navbar } from './experience/UI/Navbar'
import { Sidebar } from './experience/UI/Sidebar'
import { InfoPanel } from './experience/UI/InfoPanel'
import { TimeMachineSlider } from './experience/UI/TimeMachineSlider'
import { TimeOfDaySlider } from './experience/UI/TimeOfDaySlider'
import { AICopilotModal } from './experience/UI/AICopilotModal'
import { ShareModal } from './experience/ShareExport/ShareModal'
import { TourBuilder } from './experience/Tour/TourBuilder'
import { MaterialConfigurator } from './experience/Materials/MaterialConfigurator'
import { HotspotModal } from './experience/Hotspots/HotspotModal'

function App() {
  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Navbar />
      <Sidebar />
      <InfoPanel />
      <AICopilotModal />
      <TimeOfDaySlider />
      <TimeMachineSlider />
      
      <ShareModal />
      <TourBuilder />
      <MaterialConfigurator />
      <HotspotModal />

      <Viewer />
    </main>
  )
}

export default App
