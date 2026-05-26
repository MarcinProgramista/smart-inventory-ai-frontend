/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useFetchContacts from "../../hooks/useFetchContacts";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import SearchBar from "../shared/search/SearchBar";

export default function Contacts() {
  const { auth } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const { contacts, total, fetchContacts } = useFetchContacts();

  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? 1);
  const limit = 8;
  const sortBy = searchParams.get("sort") ?? "last_name";
  const sortOrder = searchParams.get("order") ?? "asc";

  const [search, setSearch] = useState(query);
  const debouncedSearch = useDebounce(search, 400);
  /* ===================== FETCH ===================== */

  useEffect(() => {
    if (!auth?.id) return;

    fetchContacts(auth.id, {
      q: debouncedSearch,
      page,
      limit,
      sort: sortBy,
      order: sortOrder,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.id, debouncedSearch, page, sortBy, sortOrder]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", 1); // reset page TYLKO przy search
      return next;
    });
  };

  const setSortParams = (by, order) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sort", by);
      next.set("order", order);
      next.set("page", 1);
      return next;
    });
  };

  const setPage = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", value);
      return next;
    });
  };

  console.log(contacts);

  return (
    <>
      <SearchBar
        value={search}
        onChange={handleSearchChange}
        placeholder="Search contacts..."
      />
    </>
  );
}
