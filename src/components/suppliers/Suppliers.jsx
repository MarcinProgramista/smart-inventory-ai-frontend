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
import AddSupplierDrawer from "./AddSupplierDrawer";
import { normalizeSupplierPayload } from "./supplier.utils";

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
  const [addOpen, setAddOpen] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);
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
  const handleDelete = async (supplier) => {
    await deleteSupplier(supplier);

    fetchSuppliers(auth.id, {
      q: debouncedSearch,
      page,
      limit,
      sort: sortBy,
      order: sortOrder,
    });
  };

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
        onEdit={(c) => setEditSupplier(c)}
        onDelete={handleDelete}
        onAdd={() => setAddOpen(true)}
      />
      <AddSupplierDrawer
        open={addOpen || !!editSupplier}
        initialData={editSupplier}
        onClose={() => {
          setAddOpen(false);
          setEditSupplier(null);
        }}
        onSubmit={async (payload) => {
          if (editSupplier) {
            await updateSupplier(editSupplier.id, payload);
          } else {
            await addSupplier({
              ...normalizeSupplierPayload(payload),
              user_id: Number(auth.id),
            });
          }

          fetchSuppliers(auth.id, {
            q: debouncedSearch,
            page,
            limit,
            sort: sortBy,
            order: sortOrder,
          });

          setAddOpen(false);
          setEditSupplier(null);
        }}
      />
    </>
  );
}
