import { Route, Routes } from "react-router-dom";
import { HomePage, SignUpPage, OtpPage } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/otp" element={<OtpPage />} />
    </Routes>
  );
};

export default App;
