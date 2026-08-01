import { Viewer } from './experience/Viewer/Viewer'
import { ResponsiveLayout } from './experience/ui/layout/ResponsiveLayout'
import { Topbar } from './experience/ui/topbar/Topbar'
import { BottomToolbar } from './experience/ui/bottombar/BottomToolbar'
import { PanelManager } from './experience/ui/panels/PanelManager'

function App() {
  const uiLayer = (
    <>
      <Topbar />
      <PanelManager />
      <BottomToolbar />
    </>
  )

  return (
    <ResponsiveLayout uiLayer={uiLayer}>
      <Viewer />
    </ResponsiveLayout>
  )
}

export default App
