import axios from "../api/axios";
import API_CONFIG from "../config/api";
import useAuth from "./useAuth";

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      console.log("REFRESH START");

      const response = await axios.get(API_CONFIG.ENDPOINTS.REFRESH_TOKEN, {
        withCredentials: true,
      });

      console.log("REFRESH SUCCESS", response.data);

      setAuth((prev) => ({
        ...prev,
        accessToken: response.data.accessToken,
      }));

      return response.data.accessToken;
    } catch (err) {
      console.error("REFRESH ERROR", err);

      throw err;
    }
  };

  return refresh;
}
