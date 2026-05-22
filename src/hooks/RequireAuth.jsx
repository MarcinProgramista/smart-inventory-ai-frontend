import useAuth from "./useAuth";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { auth } = useAuth();
  return auth?.accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};
export default RequireAuth;
