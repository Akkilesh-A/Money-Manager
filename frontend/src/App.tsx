import { Routes, Route } from "react-router-dom"
import { ModeToggle, ThemeProvider } from "./components"
import { LandingPage } from "./sections"
import { H1 } from "./components/ui"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ModeToggle />
      <Routes>
        <Route path="/" element={<H1>Lol</H1>} />
        <Route path="/home" element={<LandingPage />} />
      </Routes>

    </ThemeProvider>
  )
}

export default App
