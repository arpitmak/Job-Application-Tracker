import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import ProtectedRoute from "./Auth/ProtectedRoutes";
import { useAuth } from "./Auth/AuthContext";

export default function App() {
  const { isAuthed } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={isAuthed ? "/dashboard" : "/login"} replace />} />
        <Route path="/login" element={isAuthed ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/register" element={isAuthed ? <Navigate to="/dashboard" replace /> : <Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

