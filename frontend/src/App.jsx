import { BrowserRouter, Route,Routes } from "react-router-dom"
import UserLandingPage from "./pages/UserLandingPage"
import { SideBar } from "./components/SideBar"

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <SideBar />
        <Routes>
          <Route path ="/" element={<UserLandingPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}