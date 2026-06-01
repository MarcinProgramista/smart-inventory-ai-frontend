import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import API_CONFIG from "../config/api";

export default function useFetchSuppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [total, setTotal] = useState(0);

  const axiosPrivate = useAxiosPrivate();
  const fetchSuppliers = async (
    userId,
    {
      q = "",
      page = 1,
      limit = 10,
      sort = "name",
      order = "asc",
      country = "",
      city = "",
    },
  ) => {
    const res = await axiosPrivate.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SUPPLIERS_SEARCH}`,
      {
        params: {
          user_id: userId,
          q,
          page,
          limit,
          sort,
          order,
          country,
          city,
        },
        withCredentials: true,
      },
    );
    setSuppliers(res.data.items ?? []);
    setTotal(res.data.total ?? 0);
  };

  return {
    suppliers,
    total,
    fetchSuppliers,
  };
}
