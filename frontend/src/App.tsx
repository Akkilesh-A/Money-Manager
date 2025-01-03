import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components"
import { 
  LandingPage, 
  SignInPage, 
  SignUpPage, 
  ProfilePage,
  TagsPage,
  SpendingsPage,
  SendMoneyPage,
  OTPVerificationPage
 } from "./pages"
import { Toaster } from "./components/ui"

function App() {
  return (
    <div className="">
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Toaster />
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/otp" element={<OTPVerificationPage />} />
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
