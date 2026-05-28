import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <div className="text-3xl font-bold text-blue-500">RECAM Frontend</div>
    </>
  );
}

export default App;
