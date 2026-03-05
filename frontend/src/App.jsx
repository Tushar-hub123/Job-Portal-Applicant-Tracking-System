import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import RecruiterDashboard from "./RecruiterDashboard";
import CandidateDashboard from "./CandidateDashboard";
import AdminDashboard from "./AdminDashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />

        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;