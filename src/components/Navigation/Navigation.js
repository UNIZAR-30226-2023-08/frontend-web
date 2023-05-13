import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  return localStorage.getItem("access_token") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}
