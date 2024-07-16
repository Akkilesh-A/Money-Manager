import { BrowserRouter, Route,Routes } from "react-router-dom"
import { SignIn,SideBar } from "./components"
import {UserLandingPage, SendMoneyPage, TransactionsPage, CustomizeTagsPage} from "./pages"
import SignUpPage from "./pages/SignUpPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<UserLandingPage />}/>
        <Route path ="/signin" element={<SignIn />}/>
        <Route path ="/sendmoneypage" element={<SendMoneyPage />}/>
        <Route path ="/transactions" element={<TransactionsPage />}/>
        <Route path="/customizetags" element={<CustomizeTagsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path ="*" element={<UserLandingPage />}/>
      </Routes>
    </BrowserRouter>
  )
}