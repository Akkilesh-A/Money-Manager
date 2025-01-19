import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  SignUpPage,
  OtpPage,
  SignInPage,
  DashboardPage,
  TagsPage,
  SendMoneyPage,
  TransactionsPage,
  ProfilePage,
} from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/tags" element={<TagsPage />} />
      <Route path="/send-money" element={<SendMoneyPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default App;
