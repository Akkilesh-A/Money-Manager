import { Route, Routes } from "react-router-dom";
import { HomePage, SignUpPage } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default App;
