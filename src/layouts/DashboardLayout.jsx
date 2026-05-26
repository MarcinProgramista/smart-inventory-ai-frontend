import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";

import AuthContext from "../context/AuthProvider";
import API_CONFIG from "../config/api";

import Button from "../components/ui/buttons/Button";
import { LogoutContainer } from "../components/dashboard/DashboardStyles";

export default function DashboardLayout() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGOUT}`,
        { withCredentials: true },
      );
    } catch (err) {
      console.error(err);
    }

    setAuth({});
    navigate("/login");
  };

  return (
    <>
      <LogoutContainer>
        <Button onClick={handleLogout}>Log Out</Button>
      </LogoutContainer>

      <Outlet />
    </>
  );
}
