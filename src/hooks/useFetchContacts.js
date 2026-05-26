/* eslint-disable no-unused-vars */
import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";
import API_CONFIG from "../config/api";
import useAuth from "./useAuth";

export default function useFetchContacts() {
  const { auth } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const fetchContacts = async (
    userId,
    { q = "", page = 1, limit = 10, sort = "last_name", order = "asc" } = {},
  ) => {
    const res = await axiosPrivate.get(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS_SEARCH}`,
      {
        params: {
          user_id: userId,
          q,
          page,
          limit,
          sort,
          order,
        },
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
        },
        withCredentials: true,
      },
    );
    setContacts(res.data.items ?? []);
    setTotal(res.data.total ?? 0);
  };
  return {
    contacts,
    total,
    fetchContacts,
  };
}
