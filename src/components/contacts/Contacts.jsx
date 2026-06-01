/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useFetchContacts from "../../hooks/useFetchContacts";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import SearchBar from "../shared/search/SearchBar";
import ContactList from "./ContactList";
import ToastContext from "../../context/ToastContext";
import useContactActions from "../../hooks/useContactActions";
import AddContactDrawer from "./AddContactDrawer";
import { normalizeContactPayload } from "./contact.utilis";
import useSearchParamsHelpers from "../../hooks/useSearchParamsHelpers";

export default function Contacts() {
  const { auth } = useAuth();
  const { showToast } = useContext(ToastContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const { setQuery, setSort, setPage } =
    useSearchParamsHelpers(setSearchParams);
  const { contacts, total, fetchContacts } = useFetchContacts();

  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? 1);
  const limit = 8;
  const sortBy = searchParams.get("sort") ?? "last_name";
  const sortOrder = searchParams.get("order") ?? "asc";
  const { addContact, updateContact, deleteContact } = useContactActions({
    showToast,
  });
  const [search, setSearch] = useState(query);
  const debouncedSearch = useDebounce(search, 400);

  const [addOpen, setAddOpen] = useState(false);
  const [editContact, setEditContact] = useState(null);
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
    setQuery(value);
  };
  const handleDelete = async (contact) => {
    await deleteContact(contact);

    fetchContacts(auth.id, {
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
        placeholder="Search contacts..."
      />
      <ContactList
        contacts={contacts}
        query={debouncedSearch}
        page={page}
        limit={limit}
        total={total}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={setSort}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
        onDelete={handleDelete}
        onAdd={() => setAddOpen(true)}
        onEdit={(c) => setEditContact(c)}
      />
      <AddContactDrawer
        open={addOpen || !!editContact}
        initialData={editContact}
        onClose={() => {
          setAddOpen(false);
          setEditContact(null);
        }}
        onSubmit={async (payload) => {
          if (editContact) {
            await updateContact(editContact.id, payload);
          } else {
            await addContact({
              ...normalizeContactPayload(payload),
              user_id: Number(auth.id),
            });
          }

          fetchContacts(auth.id, {
            q: debouncedSearch,
            page,
            limit,
            sort: sortBy,
            order: sortOrder,
          });

          setAddOpen(false);
          setEditContact(null);
        }}
      />
    </>
  );
}
