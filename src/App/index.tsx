import { Routes, Route, Outlet, Navigate } from "react-router";

import Login from "../pages/auth";
import SignUp from "../pages/signup";
import Dashboard from "../pages/dashboard";
import { useAuthStore } from "@/store/useAuthStore";
import SettingsPage from "@/pages/settingsPage";
import Layout from "@/pages/layout";
import Boards from "@/pages/boards";

// Protected Route Component
const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);
  return user ? <Outlet /> : <Navigate to="/auth" />;
};

// Public Route (Redirects logged-in users)
const PublicRoute = () => {
  const user = useAuthStore((state) => state.user);
  return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/auth" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
}
