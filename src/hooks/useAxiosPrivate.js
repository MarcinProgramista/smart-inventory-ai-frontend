import { useEffect } from "react";

import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

import { axiosPrivate } from "../api/axios";

export default function useAxiosPrivate() {
  const { auth } = useAuth();

  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // dodaj token TYLKO jeśli request go jeszcze nie ma
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,

      async (error) => {
        const prevRequest = error?.config;

        // access token wygasł
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;

          // pobierz nowy access token
          const newAccessToken = await refresh();

          // ponów request z NOWYM tokenem
          return axiosPrivate({
            ...prevRequest,
            headers: {
              ...prevRequest.headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
          });
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);

      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
}
