import axios from "../api/axios";
import API_CONFIG from "../config/api";
import useAuth from "./useAuth";

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(API_CONFIG.ENDPOINTS.REFRESH_TOKEN, {
      withCredentials: true,
    });

    setAuth((prev) => ({
      ...prev,
      accessToken: response.data.accessToken,
    }));

    return response.data.accessToken;
  };

  return refresh;
}
