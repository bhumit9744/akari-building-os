import { TwinCanvas } from './components/Scene/TwinCanvas'
import { Navbar } from './components/UI/Navbar'
import { Sidebar } from './components/UI/Sidebar'
import { InfoPanel } from './components/UI/InfoPanel'

function App() {
  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Navbar />
      <Sidebar />
      <InfoPanel />
      <TwinCanvas />
    </main>
  )
}

export default App
