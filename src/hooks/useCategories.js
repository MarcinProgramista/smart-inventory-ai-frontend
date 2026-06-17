import { useEffect, useState } from "react";
import API_CONFIG from "../config/api";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

export default function useCategories() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!auth?.id) return;

    axiosPrivate
      .get(API_CONFIG.ENDPOINTS.CATEGORIES, {
        params: { user_id: auth.id },
      })
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error("Categories error:", err);
      });
  }, [auth?.id, axiosPrivate]);

  return categories;
}
