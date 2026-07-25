import { TwinCanvas } from './components/Scene/TwinCanvas'
import { Navbar } from './components/UI/Navbar'
import { Sidebar } from './components/UI/Sidebar'
import { InfoPanel } from './components/UI/InfoPanel'
import { TimeMachineSlider } from './components/UI/TimeMachineSlider'

function App() {
  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Navbar />
      <Sidebar />
      <InfoPanel />
      <TimeMachineSlider />
      <TwinCanvas />
    </main>
  )
}

export default App
