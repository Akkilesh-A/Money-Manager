import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components"
import { LandingPage, SignInPage, SignUpPage } from "./pages"
import { H1, Toaster } from "./components/ui"

function App() {
  return (
    <div className="">
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Toaster />
        <Routes>
          <Route path="/" element={<H1>Lol</H1>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/home" element={<LandingPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
