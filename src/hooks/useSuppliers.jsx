import { useEffect, useState } from "react";
import API_CONFIG from "../config/api";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

export default function useSuppliers() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    if (!auth?.id) return;

    axiosPrivate
      .get(API_CONFIG.ENDPOINTS.SUPPLIERS, {
        params: { user_id: auth.id },
      })
      .then((res) => setSuppliers(res.data))
      .catch((err) => {
        console.error("Suppliers error:", err);
      });
  }, [auth?.id, axiosPrivate]);

  return suppliers;
}
