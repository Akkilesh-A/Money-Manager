import { BrowserRouter, Route,Routes } from "react-router-dom"
import {UserLandingPage, SendMoneyPage, TransactionsPage, CustomizeTagsPage, SignUpPage, SignInPage} from "./pages"
import { ToastContainer } from "react-toastify"

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path ="/" element={<UserLandingPage />}/>
        <Route path ="/sendmoneypage" element={<SendMoneyPage />}/>
        <Route path ="/signin" element={<SignInPage />}/>
        <Route path ="/transactions" element={<TransactionsPage />}/>
        <Route path="/customizetags" element={<CustomizeTagsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path ="*" element={<UserLandingPage />}/>
      </Routes>
    </BrowserRouter>
  )
}