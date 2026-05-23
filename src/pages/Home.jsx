import { LogoutContainer } from "../components/dashboard/DashboardStyles";
import Button from "../components/ui/buttons/Button";
import StyledLink from "../components/ui/buttons/StyledLink";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import API_CONFIG from "../config/api";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.delete(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGOUT}`,
        { withCredentials: true },
      );
    } catch (err) {
      console.error("Logout request failed:", err);
    }

    setAuth({});
    navigate("/login");
  };
  return (
    <>
      <LogoutContainer>
        <Button onClick={handleLogout}>Log Out</Button>
      </LogoutContainer>
    </>
  );
}
