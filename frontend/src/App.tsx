import { Routes, Route } from "react-router-dom"
import { ModeToggle, ThemeProvider } from "./components"
import { LandingPage, SignUpPage } from "./sections"
import { H1, Toaster } from "./components/ui"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ModeToggle />
      <Toaster />
      <Routes>
        <Route path="/" element={<H1>Lol</H1>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<LandingPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
