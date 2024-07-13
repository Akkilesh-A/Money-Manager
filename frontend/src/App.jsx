import { BrowserRouter, Route,Routes } from "react-router-dom"
import { SignIn,SideBar } from "./components"
import {UserLandingPage,SendMoney } from "./pages"
import TransactionsPage from "./pages/TransactionsPage"

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <SideBar />
        <Routes>
          <Route path ="/" element={<UserLandingPage />}/>
          <Route path ="/signin" element={<SignIn />}/>
          <Route path ="/sendmoney" element={<SendMoney />}/>
          <Route path ="/transactions" element={<TransactionsPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}