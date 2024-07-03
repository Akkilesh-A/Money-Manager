import { BrowserRouter, Route,Routes } from "react-router-dom"
import UserLandingPage from "./pages/UserLandingPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<UserLandingPage />}/>
      </Routes>
    </BrowserRouter>
  )
}