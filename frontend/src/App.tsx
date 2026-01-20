// ============================================================================
// IMPORTS - Bringing in tools we need
// ============================================================================

import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/mode-toggle/theme-provider'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import StandingsPage from './pages/StandingsPage'


// ============================================================================
// MAIN APP COMPONENT - Router that controls which page to show
// ============================================================================

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/standings" element={<StandingsPage />} />
          <Route path="*" element={<div className="text-center text-2xl mt-20">404 - Page Not Found</div>} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

// Export so main.tsx can use it
export default App
