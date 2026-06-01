/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import ToastContext from "../../context/ToastContext";
import useSupplierActions from "../../hooks/useSupplierAction";
import useFetchSuppliers from "../../hooks/useFetchSuppliers";
import useDebounce from "../../hooks/useDebounce";
import SearchBar from "../shared/search/SearchBar";
import SuppliersList from "./SuppliersList";
import useSearchParamsHelpers from "../../hooks/useSearchParamsHelpers";

export default function Suppliers() {
  const { auth } = useAuth();
  const { showToast } = useContext(ToastContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const { setQuery, setSort, setPage } =
    useSearchParamsHelpers(setSearchParams);
  const { suppliers, total, fetchSuppliers } = useFetchSuppliers();

  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? 1);
  const limit = 8;
  const sortBy = searchParams.get("sort") ?? "name";
  const sortOrder = searchParams.get("order") ?? "asc";
  const { addSupplier, updateSupplier, deleteSupplier } = useSupplierActions({
    showToast,
  });

  const [search, setSearch] = useState(query);
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    if (!auth.id) return;
    fetchSuppliers(auth.id, {
      q: debouncedSearch,
      page,
      limit,
      sort: sortBy,
      order: sortOrder,
    });
  }, [auth?.id, debouncedSearch, page, sortBy, sortOrder]);
  const handleSearchChange = (value) => {
    setSearch(value);
    setQuery(value);
  };
  console.log(suppliers);

  return (
    <>
      <SearchBar
        value={search}
        onChange={handleSearchChange}
        placeholder="Search suppliers .."
      />
      <SuppliersList
        suppliers={suppliers}
        query={debouncedSearch}
        page={page}
        limit={limit}
        total={total}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={setSort}
        onEdit={() => {}}
        onDelete={() => {}}
        onAdd={() => {}}
      />
    </>
  );
}
