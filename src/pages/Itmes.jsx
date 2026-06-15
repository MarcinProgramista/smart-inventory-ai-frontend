/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useFetchItems from "../hooks/useFetchItems";
import ToastContext from "../context/ToastContext";
import useDebounce from "../hooks/useDebounce";
import useSearchParamsHelpers from "../hooks/useSearchParamsHelpers";
import SearchBar from "../components/shared/search/SearchBar";

export default function Items() {
  const { auth } = useAuth();
  const { showToast } = useContext(ToastContext);

  const [editingItem, setEditingItem] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const { setQuery, setSort, setPage } =
    useSearchParamsHelpers(setSearchParams);

  const getParam = (key, def = "") => searchParams.get(key) ?? def;

  // Params from URL
  const query = getParam("q");
  const categoryId = getParam("category");
  const supplierId = getParam("supplier");
  const stock = getParam("stock");
  const sortBy = getParam("sort", "name");
  const sortOrder = getParam("order", "asc");
  const page = Number(getParam("page", 1));

  const [search, setSearch] = useState(query);
  const debouncedSearch = useDebounce(search, 400);

  const { items, total, fetchItems } = useFetchItems();

  const limit = 5;

  // DLA FILTRÓW I SORTU → reset page
  const setFilterParam = (key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (value === "" || value == null) {
        next.delete(key);
      } else {
        next.set(key, value);
      }

      next.set("page", 1);
      return next;
    });
  };

  // TYLKO SORT
  const setSortParams = (by, order) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sort", by);
      next.set("order", order);
      next.set("page", 1);
      return next;
    });
  };

  // TYLKO PAGINACJA
  const setPageParam = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", value);
      return next;
    });
  };

  useEffect(() => {
    if (!auth?.id) return;

    fetchItems(auth.id, {
      page,
      limit,
      q: debouncedSearch,
      categoryId,
      supplierId,
      stock,
      sort: sortBy,
      order: sortOrder,
    });
  }, [
    auth?.id,
    page,
    debouncedSearch,
    categoryId,
    supplierId,
    stock,
    sortBy,
    sortOrder,
  ]);
  const handleSearchChange = (value) => {
    setSearch(value);
    setQuery(value);
  };

  return (
    <>
      <SearchBar
        value={search}
        onChange={handleSearchChange}
        placeholder="Search items .."
      />
    </>
  );
}
