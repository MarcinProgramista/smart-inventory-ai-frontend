import { ChevronDown, ChevronUp } from "lucide-react";
import styled from "styled-components";
import { PageWrapper } from "../shared/table/Table.styles";
import Pagination from "../shared/Pagination";
import ListHeader from "../shared/header/ListHeader";
import { exportContactsToCSV, exportContactsToPDF } from "./export.utils";

/* eslint-disable no-unused-vars */
const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  opacity: 0.7;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 15px;
`;
function SortIcon({ active, order }) {
  if (!active) return null;
  return order === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
}
export default function ContactList({
  contacts,
  query,
  page,
  limit,
  total,
  onPrev,
  onNext,
  onEdit,
  onDelete,
  onAdd,
  sortBy,
  sortOrder,
  onSortChange,
}) {
  const isEmpty = contacts.length === 0;
  const isSearching = query && query.length > 0;
  return (
    <>
      <PageWrapper>
        <ListHeader
          onAdd={onAdd}
          heading="Contacts"
          onExportCSV={() => exportContactsToCSV(contacts)}
          onExportPDF={() => exportContactsToPDF(contacts)}
          addTitle="Add Contact"
        />
        <Pagination
          page={page}
          totalPages={Math.ceil(total / limit)}
          canPrev={page > 1}
          canNext={page < Math.ceil(total / limit)}
          onPrev={onPrev}
          onNext={onNext}
        />
      </PageWrapper>
    </>
  );
}
