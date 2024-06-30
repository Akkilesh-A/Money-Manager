import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";

const PORT = import.meta.env.VITE_PORT || 8000;

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default App;
