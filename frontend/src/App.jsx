import { BrowserRouter, Route,Routes } from "react-router-dom"
import { SignIn,SideBar } from "./components"
import {UserLandingPage, SendMoneyPage, TransactionsPage, CustomizeTagsPage} from "./pages"

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <SideBar />
        <Routes>
          <Route path ="/" element={<UserLandingPage />}/>
          <Route path ="/signin" element={<SignIn />}/>
          <Route path ="/sendmoneypage" element={<SendMoneyPage />}/>
          <Route path ="/transactions" element={<TransactionsPage />}/>
          <Route path="/customizetags" element={<CustomizeTagsPage />} />
          <Route path ="*" element={<UserLandingPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}