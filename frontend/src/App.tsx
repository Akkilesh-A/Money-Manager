import { Routes, Route, Link } from "react-router-dom"
import { ThemeProvider } from "./components"
import { 
  LandingPage, 
  SignInPage, 
  SignUpPage, 
  ProfilePage,
  TagsPage,
  SpendingsPage,
  SendMoneyPage
 } from "./pages"
import { H1, Toaster } from "./components/ui"

function App() {
  return (
    <div className="">
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Toaster />
        <Routes>
          <Route path="/" element={<div>
            <H1>Lol</H1>
            <Link to={"/home"}>Go to Home!</Link>
          </div>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/transactions" element={<SpendingsPage />} />
          <Route path="/send-money" element={<SendMoneyPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
