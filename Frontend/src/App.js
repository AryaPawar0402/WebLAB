import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CreateTest from "./pages/CreateTest";
import StudentDashboard from "./pages/StudentDashboard";
import AttemptTest from "./pages/AttemptTest";
import TestList from "./pages/TestList";
import TestDetails from "./pages/TestDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-test" element={<CreateTest />} />

        {/* Student */}
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/test/:id" element={<AttemptTest />} />

        {/* Shared */}
        <Route path="/tests" element={<TestList />} />
        <Route path="/test/:id/details" element={<TestDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;